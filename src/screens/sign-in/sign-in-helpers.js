import { server } from '../../variables';

let setTokenInLocalStorage = (userData) => {
    let token = userData.token;
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

export let signIn = (signInForm, updateUserObject, history) => 
    async() => {
        let userData = await fetchSignIn(signInForm);
        setTokenInLocalStorage(userData);
        updateUserObject(userData);
        history.push('/search');
    };