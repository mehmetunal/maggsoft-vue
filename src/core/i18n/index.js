import { createI18n } from "vue-i18n";

import * as localStorageHelper from "@/core/local-storage/index";

const currentCulture = localStorageHelper.getCurrentCulture();


const i18n = createI18n({
  locale: currentCulture == null ? process.env.VUE_APP_I18N_LOCALE || "en" : currentCulture.code,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  silentTranslationWarn: true,
});

export default i18n;
