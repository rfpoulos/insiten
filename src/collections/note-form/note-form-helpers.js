import { server } from '../../variables';

export let getNotes = (companyId) =>
    fetch(server + 'companynotes/' + companyId, {
        method: "GET",
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
            })
    }).then(data => data.json())