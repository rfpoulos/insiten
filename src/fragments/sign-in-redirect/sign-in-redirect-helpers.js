import { server } from '../../variables';

export let fetchUser = () =>
    fetch(server + 'user', {
        method: "GET",
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token') 
            })
        })
        .then(res => res.json());