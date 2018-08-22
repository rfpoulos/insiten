export let route = (history, path)=> () => {
    history.push('/' + path)
}