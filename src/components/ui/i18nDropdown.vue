<template>
  <li class="nav-item b-nav-dropdown dropdown">
    <ul
        class="nav navbar-nav d-none d-sm-flex flex justify-content-start ml-8pt"
    >
      <li class="nav-item dropdown" v-if="flags">
        <a
            href="#"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            data-caret="false"
        >

          <span class="avatar avatar-xs">
            <img :src="flags[$i18n.locale]" class="avatar-img rounded-circle" alt=""/>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a
              href="#"
              v-for="locale in locales"
              :key="`locale-${locale.code}`"
              @click.prevent="$switchLocalePath(locale)"
              v-bind:class="{ 'disabled dropdown-item active': $i18n.locale === locale.code }"
              class="dropdown-item"
          >
            {{ $t(locale.name) }}</a
          >
        </div>
      </li>
    </ul>
  </li>
</template>

<script>

import * as localStorageHelper from "@/core/local-storage/index";

export default {
  data() {
    return {
      flags: {},
      locales: [],
    }
  },
  methods: {
    $switchLocalePath(locale) {
      try {
        localStorageHelper.setCulture(locale);
        this.$router.push(this.switchLocalePath(locale.code));
      } catch (e) {
        this.$root.$i18n.locale = locale.code;
      }
    },
  },
  created() {
    let $this = this;
    this.$store.dispatch("LOCALE_MESSAGES", {}).then((res) => {
      $this.flags = res.flags;
      $this.locales = res.locales;
    });
  }
};
</script>
