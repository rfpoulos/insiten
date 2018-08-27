import { server } from '../../variables';

export let getNotes = (companyId) =>
    fetch(server + 'companynotes/' + companyId, {
        method: "GET",
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
            })
    }).then(data => data.json())

export let getContactsSearch = (companyId) =>
    (query) =>
    fetch(server + 'contacts/' +  
    companyId + '/' +
    query, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())

export let postNote = (note) =>
    fetch(server + 'notes', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())

