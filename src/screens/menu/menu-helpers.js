export let logout = (
    resetState,
    route,
) => () => {
    localStorage.clear();
    resetState();
    route();
}