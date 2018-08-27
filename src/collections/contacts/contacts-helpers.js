import { server } from '../../variables';

export let getAllContacts = (companyId) =>
    fetch(server + 'companycontacts/' +  
    companyId, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())