const getDomVueInstance = () => {
    // eslint-disable-next-line no-undef
    let __VUE_HOT_MAP__ = Object.entries(window.__VUE_HOT_MAP__);
    if (__VUE_HOT_MAP__ === null || __VUE_HOT_MAP__ === undefined)
        throw new Error("__VUE_HOT_MAP__ is null");

    let vueInstance;

    if (__VUE_HOT_MAP__.length === 1) {
        // eslint-disable-next-line no-unused-vars
        vueInstance = __VUE_HOT_MAP__.map(([k, v]) => v)[0];
    } else {
        // eslint-disable-next-line no-unused-vars
        vueInstance = __VUE_HOT_MAP__.map(([k, v]) => v).find(f => f.options.name.toLocaleLowerCase() === "app".toLocaleLowerCase());
    }

    if (vueInstance === null || vueInstance === undefined)
        throw new Error("vueInstance is null");

    let instance = vueInstance.instances[0]
    if (instance === null || instance === undefined)
        throw new Error("vueInstance is null");

    return instance;
}

export default {
    getDomVueInstance
};
