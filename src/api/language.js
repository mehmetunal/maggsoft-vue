import {getAsync, getByIdAsync, postAsync, putAsync, delAsync, service} from '@/core/services'

const url = "localization/language";

const setBaseUrl = () => {
    service.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
}

const get = async (pageIndex = null, pageSize = null, showHidden = null) =>
    await getAsync(url, pageIndex, pageSize, showHidden);

const getById = async (id) =>
    await getByIdAsync(url, id);

const post = async (payload) =>
    await postAsync(url, payload);

const put = async (payload) =>
    await putAsync(url, payload);

const del = async (id) =>
    await delAsync(url, id);

export {
    get,
    getById,
    post,
    put,
    del,
    setBaseUrl
}
