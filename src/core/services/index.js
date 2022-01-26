// import Vue from 'vue'
// export var vs = Vue.prototype.$vs;

import i18n from "../i18n";
import service from "../custom-axios";
import toast from "../utils/dev-toast";
import loading from "../utils/dev-loading";

const requestAsync = async (config) => {
  return await new Promise((resolve, reject) => {
    service
      .request(config)
      .then((result) => resolve(result))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};
const getAsync = async (
  url,
  pageIndex = null,
  pageSize = null,
  showHidden = null,
  qParams = null
) => {
  let params = new URLSearchParams();
  if (pageIndex !== null) {
    params.append("PageIndex", pageIndex);
  }
  if (pageSize !== null) {
    params.append("PageSize", pageSize);
  }
  if (showHidden !== null) {
    params.append("showHidden", showHidden);
  }
  if (qParams != null && typeof qParams == "object") {
    let qp = new URLSearchParams();
    Object.keys(qParams).forEach((key) => {
      qp.append(key, qParams[key]);
    });
    params = new URLSearchParams({
      ...Object.fromEntries(params),
      ...Object.fromEntries(qp),
    });
  }
  let request = { params: params };
  return await new Promise((resolve, reject) => {
    service
      .get(url, request)
      .then((result) => resolve(result))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};
const getByIdAsync = async (url, id, pageIndex = null, pageSize = null) => {
  let params = new URLSearchParams();
  if (pageIndex !== null) {
    params.append("PageIndex", pageIndex);
  }
  if (pageSize !== null) {
    params.append("PageSize", pageSize);
  }
  let request = { params: params };
  return await new Promise((resolve, reject) => {
    service
      .get(`${url}/${id}`, request)
      .then((result) => resolve(result))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};

const postAsync = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    service
      .post(url, payload)
      .then((result) => resolve(_then(result)))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};

const putAsync = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    service
      .put(url, payload)
      .then((result) => resolve(_then(result)))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};

const patchAsync = async (url, payload) => {
  return await new Promise((resolve, reject) => {
    service
      .patch(url, payload)
      .then((result) => resolve(_then(result)))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};
const delAsync = async (url, id) => {
  return await new Promise((resolve, reject) => {
    service
      .delete(`${url}/${id}`)
      .then((result) => resolve(_then(result)))
      .catch((error) => reject(_catch(error)))
      .finally(_finally);
  });
};

const _then = (result) => {
  if (result.Success === true) {
    toast.success(i18n.t("message.save"));
  }
  return result;
};
const _catch = (error) => {
  // toast.error(i18n.t("error.message"));
  return error;
};
const _finally = () => {
  loading.close();
};

export {
  service,
  requestAsync,
  getAsync,
  getByIdAsync,
  postAsync,
  putAsync,
  patchAsync,
  delAsync,
  _then,
  _catch,
  _finally,
};
