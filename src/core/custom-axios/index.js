import axios from "axios";
import * as localStorageHelper from "../local-storage/index";
import loading from "../utils/dev-loading";
import toast from "../utils/dev-toast";

let baseURL = process.env.VUE_APP_AXIOS_BASE_URL;

const instance = axios.create({ baseURL: baseURL });

let bearerToken = `Bearer ${localStorageHelper.getToken()}`;

instance.defaults.headers.common["Authorization"] = bearerToken;
instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";

let currentCulture = localStorageHelper.getCurrentCulture();
if(currentCulture){
  instance.defaults.headers.common["X-LanguageID"] = currentCulture.id;
}

// Add a request interceptor
instance.interceptors.request.use(
  function (response) {
    // Do something before request is sent
    loading.open();
    return response;
  },
  function (error) {
    loading.close();
    // Do something with request error
    // helper.$vs.notify({color: "danger", title: i18n.t("message.system_error"), text: error.message});
    toast.error(error.message);
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let result = response;
    if (response.status === 200 || response.status === 201) {
      if (result.data.Success === false) {
        if (result.data.IsError === true) {
          if (result.data.SystemError != null) {
            toast.error(result.data.SystemError);
          }
        }

        result.data.Messages.forEach((message) => {
          toast.warning(message);
        });

        result.data.ValidationMessages.forEach((message) => {
          toast.warning(message);
        });
      }
      loading.close();
      return response.data;
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      if (error.response.status === 401) {
        // let domVueInstance = helper.getDomVueInstance();
        let res = error.response;
        if (res.config && !res.config.__isRetryRequest) {
          Swal.fire({
            title: "Token",
            text: "Token süresi bitti devam etmek istiyormusunuz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Evet, Devam et",
            cancelButtonText: "Hayır, Devam etme!",
          }).then((result) => {
            if (result.isConfirmed) {
              error.config._retry = true;
              return REFRESH_TOKEN(error.config);
            } else {
              localStorageHelper.removeToken();
              window.location.assign("/login.html");
            }
          });
        }
      }
      // Logger Database
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (
        error.response.data &&
        error.response.data.Result &&
        error.response.data.Result.error
      ) {
        toast.error(error.response.data.Result.error);
      }

      if (error.response.data.IsError === true) {
        if (error.response.data.SystemError != null) {
          toast.error(error.response.data.SystemError);
        }
      }

      if (error.response.data) {
        error.response.data.ValidationMessages.forEach((message) => {
          toast.warning(message);
        });
      }
    } else if (error.request) {
      // Logger Database
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      toast.error(error.request);
    } else {
      // Logger Database
      // Something happened in setting up the request that triggered an Error
      toast.error(error.request);
    }
    loading.close();
    return Promise.reject(error);
  }
);

const REFRESH_TOKEN = (config) => {
  let ref_token = localStorageHelper.getRefreshToken();
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.VUE_APP_AUT_IS4_CLIENT_ID);
  params.append("client_secret", process.env.VUE_APP_AUT_IS4_CLIENT_SECRET);
  params.append("refresh_token", ref_token);
  return axios
    .post(process.env.VUE_APP_AUTH_LOGIN_PATH, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((result) => {
      if (result.status === 200) {
        localStorage.setItem("token", JSON.stringify(result.data));
        let token = `Bearer ${result.data.access_token}`;
        axios.defaults.headers.common["Authorization"] = token;
        config.headers["Authorization"] = token;
        return axios(config);
      }
    })
    .finally(() => {
      loading.close();
      window.location.reload();
    });
};

export default instance;
