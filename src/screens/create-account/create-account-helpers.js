import { server } from '../../variables';

let fetchCreateAccount = (createAccountForm) =>
    fetch(server + 'createaccount', {
        method: "POST",
        body: JSON.stringify(createAccountForm),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.text());

export let createAccount = (
    createAccountForm, 
    history
) => 
    async () => {
        try {
            await fetchCreateAccount(createAccountForm);
            history.push('createaccount/success')
        } catch(err) {
            console.log(err)
        }
    };