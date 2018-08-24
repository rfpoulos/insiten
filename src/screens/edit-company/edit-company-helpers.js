import { server } from '../../variables';
export let putCompany = (company) =>
    fetch(server + 'company', {
        method: "PUT",
        body: JSON.stringify(company),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
            })
    }).then(data => data.json())
