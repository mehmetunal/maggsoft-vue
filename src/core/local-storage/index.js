const set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}
const get = (key) => {
    let item = localStorage.getItem(key);
    if (item != null)
        return JSON.parse(item);
    return null;
}
const setToken = (data) => {
    set("token", JSON.stringify(data));
}
const getToken = () => {
    let item = get("token");
    if (item === null || item === undefined) return "";
    return item.access_token;
}
const removeToken = () => {
    localStorage.removeItem("token");
}
const getRefreshToken = () => {
    let item = get("token");
    if (item === null || item === undefined) return "";
    return item.refresh_token;
}

const getUser = () => {
    let jwt = localStorage.getItem("JWT");
    if (jwt == null) return jwt;
    return JSON.parse(jwt).User;
}

const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const setCulture = (q) => {
    set("CurrentCulture", q);
}
const getCurrentCulture = () => {
    return get("CurrentCulture");
}

const getRole = () => {
    let token = getToken();
    if (token) {
        let pJwt = parseJwt(token)
        if (pJwt) {
            return pJwt.role;
        }
    }
    return null;
}


export {
    set,
    get,
    setToken,
    getToken,
    removeToken,
    getRefreshToken,
    getUser,
    getRole,
    setCulture,
    getCurrentCulture,
}