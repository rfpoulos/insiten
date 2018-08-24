import React from 'react';
import {
    compose,
    mapPropsStream,
    setObservableConfig,
} from 'recompose';
import { googlePlacesAutocomplete } from './places-autocomplete-helpers';
import GoogleAttr from '../../components/google-attr/google-attr';
import { Subject } from 'rxjs/Subject';
import Autocomplete from '../../components/autocomplete/autocomplete';
import rxjsconfig from 'recompose/rxjsObservableConfig';
setObservableConfig(rxjsconfig)

export let placesAutocomplete = ({
    resultOnClick,
    placesResults,
    placesSearch,
    placesQuery,
}) =>
    <Autocomplete placeholder="Search for Address"
        results={ placesResults }
        onChange={ (event) => 
            placesSearch(event.target.value) }
        value={ placesQuery }
        resultOnClick={ resultOnClick }
        bottomFixedResults={ [
            { text: <GoogleAttr /> }
        ] }
        label="Search for Address"
    />

export let enhance = compose(
    mapPropsStream(props$ => {
        let placesSearch$ = new Subject();
        let placesSearch = v => placesSearch$.next(v);
    
        let placesQuery$ =  placesSearch$
            .startWith('');
    
        let placesResults$ = placesQuery$
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(query => query ? 
                googlePlacesAutocomplete(query) : 
                Promise.resolve([])
            )
            .map(results => results
                    .filter(result => result.place_id)
                    .map(result => ({
                    terms: result.terms,
                    text: result.description,
                    placeId: result.place_id,
                })
            )
        );
        return props$.combineLatest(
            placesResults$, 
            placesQuery$,
            (   props, 
                placesResults, 
                placesQuery
            ) => ({
                ...props, 
                placesSearch, 
                placesResults, 
                placesQuery,
          })
        )}
    ),
);

export default enhance(placesAutocomplete);