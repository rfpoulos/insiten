import { 
    server, 
    googleKey, 
} from '../../variables';
const googleMapsClient = require('@google/maps').createClient({
    key: googleKey,
    Promise: Promise
  });

export let postCompany = (company) =>
    fetch(server + 'addcompany', {
        method: "POST",
        body: JSON.stringify(company),
        headers: new Headers ({
            "Content-Type": "application/json",
            "token": localStorage.getItem('token')
            })
    }).then(data => data.json()
    ).then(data => data)



export let googlePlacesAutocomplete = (query) =>
    googleMapsClient.placesQueryAutoComplete({
        input: query,
    }).asPromise()
    .then(results => results.json.predictions)

export let googlePlacesDetail = (placeId) =>
    googleMapsClient.place({
        placeid: placeId,
        fields: ['geometry'],
    }).asPromise()
    .then(results => results.json.result.geometry.location)