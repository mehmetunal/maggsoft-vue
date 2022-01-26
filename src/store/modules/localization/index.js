import * as api from "@/api";
import i18n from "@/core/i18n";

const LOCALE_MESSAGES = () => {
  return new Promise((resolve, reject) => {
      api.language.get().then((response) => {
          if (response.Result && response.Result.Data) {
              for (let locale of response.Result.Data) {
                  let message = {};
                  for (let index = 0; index < locale.LocaleStringResources.length; index++) {
                      message[locale.LocaleStringResources[index].ResourceName] = locale.LocaleStringResources[index].ResourceValue;
                  }
                  i18n.setLocaleMessage(locale.LanguageCulture, message);
              }
          }

          let flags = {};

          let locales = response.Result.Data.map(function (m) { return { id:m.Id, code: m.LanguageCulture, name : m.Name } });

          for (let item of response.Result.Data) {
              let flagKey = item.FlagImageFileName === 'en' ? 'us' : item.FlagImageFileName;
            //   import("svg-country-flags/svg/" + flagKey + ".svg").then((img) => {
            //       flags[item.LanguageCulture] = img.default;
            //       if (Object.keys(flags).length === response.Result.Data.length) {
            //           resolve({locales, flags});
            //       }
            //   });
          }


      }, error => {
          reject(error);
      });
  });

}


const state = {};

//Statedeki dataları çeker
const getters = {};

//Proje üzeinde değişiklik
const mutations = {};
const actions = {
  LOCALE_MESSAGES
};

export default {
  state,
  getters,
  mutations,
  actions,
};
