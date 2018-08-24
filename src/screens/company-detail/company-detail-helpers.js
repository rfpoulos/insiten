import { server } from '../../variables';

export let getCompanyById = (id) =>
    fetch(server + 'company/' + id, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())