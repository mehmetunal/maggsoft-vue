import Vuex from "vuex";

import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

import authentication from "./modules/aut";
import localization from "./modules/localization";


export default new Vuex.Store({
  state: {
    status: null,
    token: null,
    user: null,
    isLogin: () => {
      let token = localStorage.getItem("token");
      return token !== undefined && token !== null;
    },
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: { authentication, localization },
});
