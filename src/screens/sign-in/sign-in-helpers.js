import { server } from '../../variables';

let setTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
};

let fetchSignIn = (signInForm) =>
    fetch(server + 'signin', {
        method: "POST",
        body: JSON.stringify(signInForm),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.json());

export let signIn = async (signInForm, updateUser, history) => {
        let user = await fetchSignIn(signInForm);
        updateUser(user);
        if (user && user.message) {
            localStorage.clear()
        } else {
            setTokenInLocalStorage(user.token);
            history.push('/search');
        }
    };