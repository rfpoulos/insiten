import React from 'react';
import {
    compose,
    mapPropsStream,
    setObservableConfig,
} from 'recompose';
import GoogleAttr from '../../components/google-attr/google-attr';
import { Subject } from 'rxjs/Subject';
import Autocomplete from '../../components/autocomplete/autocomplete';
import rxjsconfig from 'recompose/rxjsObservableConfig';
setObservableConfig(rxjsconfig)

export let placesAutocomplete = ({
    resultOnClick,
    results,
    search,
    query,
}) =>
    <Autocomplete placeholder="Search for Address"
        results={ results }
        onChange={ (event) => 
            search(event.target.value) }
        value={ query }
        resultOnClick={ resultOnClick }
        bottomFixedResults={ [
            { text: <GoogleAttr /> }
        ] }
        label="Search for Address"
    />

export let enhance = compose(
    mapPropsStream(props$ => {
        let search$ = new Subject();
        let search = v => search$.next(v);
    
        let query$ =  search$
            .startWith('');
        let fetchRequest;
        let mapCallBack;
        props$.subscribe(data =>  { 
            fetchRequest = data.fetchRequest;
            mapCallBack = data.mapCallBack;
        })
        let results$ = query$
            .debounceTime(350)
            .distinctUntilChanged()
            .switchMap(query => query ? 
                fetchRequest(query) : 
                Promise.resolve([])
            )
            .map(results => results
                    .filter(result => result.place_id)
                    .map(mapCallBack)
            );
        return props$.combineLatest(
            results$, 
            query$,
            (   props, 
                results, 
                query
            ) => ({
                ...props, 
                search, 
                results, 
                query,
          })
        )}
    ),
);

export default enhance(placesAutocomplete);