import { 
    googleKey, 
} from '../../variables';
const googleMapsClient = require('@google/maps').createClient({
    key: googleKey,
    Promise: Promise
  });

export let googlePlacesAutocomplete = (query) =>
  googleMapsClient.placesQueryAutoComplete({
      input: query,
  }).asPromise()
  .then(results => results.json.predictions)