import {getAsync, getByIdAsync, postAsync, putAsync, delAsync, service} from '@/core/services'

const setBaseUrl = () => {
    service.defaults.baseURL = "https://is4api.seyirone.com/api/";
}

//api/Users
// USER START
const userUrl = "Users";

const getUser = async () =>
    await getAsync(userUrl);

const getUserById = async (id) =>
    await getByIdAsync(userUrl, id);

const postUser = async (payload) =>
    await postAsync(userUrl, payload);

const putUser = async (payload) =>
    await putAsync(userUrl, payload);

const delUser = async (id) =>
    await delAsync(userUrl, id);

const searchUser = async (qParams, pageIndex, pageSize) =>
    await getAsync(userUrl, pageIndex, pageSize, null, qParams);

const getUserByIds = async (userIds) =>
    await getAsync(userUrl + "/GetByIds", null, null, null, {ids: userIds});

// USER END

//api/Users/Roles
// USER ROLE START

const postUserRole = async (payload) =>
    await postAsync(userUrl + "/Roles", payload);

const getUserClaims = async (userId) =>
    await getAsync(userUrl + "/" + userId + "/Claims");

// USER ROLE END

//api/Users/ChangePassword
// USER PASSWORD START

const postUserPassword = async (payload) =>
    await postAsync(userUrl + "/ChangePassword", payload);

// USER PASSWORD END

//api/Users/Claims
// USER CLAIMS START

const postUserClaims = async (payload) =>
    await postAsync(userUrl + "/Claims", payload);

const putUserClaims = async (payload) =>
    await putAsync(userUrl + "/Claims", payload)

// USER CLAIMS END


export {
    searchUser,
    setBaseUrl,
    getUser,
    getUserById,
    getUserByIds,
    postUser,
    putUser,
    delUser,
    postUserRole,
    getUserClaims,
    postUserPassword,
    postUserClaims,
    putUserClaims
}
