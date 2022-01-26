<template>
  <div>
    <label class="form-label" v-bind:for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      type="text"
      class="form-control"
      v-bind:id="id"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "dev-text",
  inheritAttrs: false,
  props: ["id", "label", "value", "placeholder"],
  data() {
    return {};
  },
  methods: {
  },
  created () {
  },
  watch: {
  },
};
</script>
