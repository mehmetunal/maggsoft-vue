// eslint-disable-next-line no-undef
let _window = window;

_window.toastr.options.progressBar = true;

const toast = {
    error: (errorMessage) =>
        _window.toastr.error(errorMessage),
    info: (infoMessage) =>
        _window.toastr.info(infoMessage),
    primary: (primaryMessage) =>
        _window.toastr.primary(primaryMessage),
    success: (successMessage) =>
        _window.toastr.success(successMessage),
    warning: (warningMessage) =>
        _window.toastr.warning(warningMessage)
}
export default toast;