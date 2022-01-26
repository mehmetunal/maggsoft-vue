// eslint-disable-next-line no-undef
let J = $;

const loading = {
    open: (elem) => {
        if (!elem) {
            elem = "body";
        }
        return J(elem).LoadingOverlay("show");
    },
    close: (elem) => {
        if (!elem) {
            elem = "body";
        }
        return J(elem).LoadingOverlay("hide");
    }
}

export default loading;