import React from 'react';
import {
    compose,
    mapPropsStream,
    setObservableConfig,
} from 'recompose';
import { Subject } from 'rxjs/Subject';
import Autocomplete from '../../components/autocomplete/autocomplete';
import rxjsconfig from 'recompose/rxjsObservableConfig';
setObservableConfig(rxjsconfig)

export let placesAutocomplete = ({
    resultOnClick,
    results,
    search,
    query,
    placeholder,
    label,
    bottomFixedResults,
}) =>
    <Autocomplete placeholder={ placeholder }
        results={ results }
        onChange={ (event) => 
            search(event.target.value) }
        value={ query }
        resultOnClick={ (result) => {
            resultOnClick(result)
            search(result.text)
        }}
        bottomFixedResults={ bottomFixedResults }
        label={ label }
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
            .map(results => results.map(mapCallBack)
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