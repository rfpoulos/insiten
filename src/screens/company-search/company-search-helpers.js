import { server } from '../../variables';

export let getCountries = country =>
    fetch(server + 'countries/' + country, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())

export let getCompanyByName = company =>
    fetch(server + 'companyname/' +  company, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())