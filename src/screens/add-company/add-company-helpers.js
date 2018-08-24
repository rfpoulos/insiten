import { server } from '../../variables';
export let postCompany = (company) =>
    fetch(server + 'addcompany', {
        method: "POST",
        body: JSON.stringify(company),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
            })
    }).then(data => data.json())