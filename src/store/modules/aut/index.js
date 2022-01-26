import axios from "axios";
import router from "../../../router";


const LOGIN = ({ commit }, payload) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", payload.username);
  params.append("password", payload.password);
  params.append("scope", process.env.VUE_APP_AUT_IS4_SCOPE);
  params.append("client_id", process.env.VUE_APP_AUT_IS4_CLIENT_ID);
  params.append("client_secret", process.env.VUE_APP_AUT_IS4_CLIENT_SECRET);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  axios
    .post(process.env.VUE_APP_AUTH_LOGIN_PATH, params, config)
    .then((result) => {
      if (result.status == 200) {
        const access_token = result.data.access_token;
        const refresh_token = result.data.refresh_token;
        commit("SET_TOKEN", access_token);
        commit("SET_REFRESH_TOKEN", refresh_token);
        router.push("/");
        //LOAD_RESOURCE
      } else {
        // warning
      }
    })
    .catch((error) => {
      //vs.notify({color: "danger", title: i18n.t("message.system_error"), text: error.message});
    })
    .finally(() => {
      //vs.loading.close();
    });
};

const REFRESH_TOKEN = ({ commit }, payload) => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.VUE_APP_AUT_IS4_CLIENT_ID);
  params.append("client_secret", process.env.VUE_APP_AUT_IS4_CLIENT_SECRET);
  params.append("refresh_token", payload);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return axios
    .post(process.env.VUE_APP_AUTH_LOGIN_PATH, params, config)
    .then((result) => {
      if (result.status == 200) {
        localStorage.setItem("token", JSON.stringify(result.data));
        //LOAD_RESOURCE
      } else {
        // warning
      }
    })
    .catch((error) => {
      //vs.notify({color: "danger", title: i18n.t("message.system_error"), text: error.message});
    })
    .finally(() => {
      //vs.loading.close();
    });
};

const LOGOUT = ({commit}, payload) => {
    localStorage.removeItem("token");
    window.location.assign('/login.html');
}


const state = {};

//Statedeki dataları çeker
const getters = {};

//Proje üzeinde değişiklik
const mutations = {};
const actions = {
  LOGIN,
  REFRESH_TOKEN,
  LOGOUT
};

export default {
  state,
  getters,
  mutations,
  actions,
};
