import { server } from '../../variables';

export let postContact = (contact) =>
    fetch(server + 'contacts/', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())

export let putContact = (contact) =>
    fetch(server + 'contacts/', {
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
        })
    }).then(data => data.json())