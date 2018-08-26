import React from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    container,
    dropDowns,
    input,
    searchContainer,
    doubleLeft,
    doubleRight,
} from './company-search-style';
import {
    getCountries,
    getCompanyByName,
    getCompanySearch,
} from './company-search-helpers';
import Title from '../../components/page-title/page-title';
import HeldDropDown from '../../configured/held-dropdown/held-dropdown';
import StatusDropDown from '../../configured/status-drop-down/status-drop-down';
import AutoComplete from '../../collections/autocomplete/autocomplete';
import DropDown from '../../components/drop-down/drop-down';
import { withRouter } from 'react-router';
import TextInput from '../../components/text-input/text-input';

export let companySearch = ({
    search,
    handleSearch,
    countryClick,
    nameClick,
    results,
    resetSearch,
}) => 
    <div style={ container }>
        <Title text="Search for Company" />
        <div style={ searchContainer }>
            <div style={ input }>
                <AutoComplete placeholder="Name"
                    label="Name"
                    fetchRequest={ getCompanyByName }
                    mapCallBack={
                        result => ({
                            results: result,
                            text: result.name
                        })
                    }
                    resultOnClick={ nameClick }
                />
            </div>
        </div>
        <Title text="Filters" />
        <div style={ searchContainer }>
            <div style={ input }>
                <AutoComplete placeholder="Country"
                    label="Country"
                    fetchRequest={ getCountries }
                    mapCallBack={
                        result => ({
                            text: result.country
                        })
                    }
                    resultOnClick={ countryClick }
                />
            </div>
            <div style={ dropDowns }>
                <HeldDropDown value={ search.held } 
                    onChange={ handleSearch('held') }
                    extraOption={{
                        text: 'Both', 
                        value: 'both',
                    }}
                />
                <StatusDropDown value={ search.status } 
                    onChange={ handleSearch('status') }
                    extraOption={{
                        text: 'Any', 
                        value: 'any',
                    }}
                />
            </div>
            <div style={ input }>
                <div style={ doubleLeft }>
                    <TextInput type="number"
                        value={ search.sizeMin }
                        onChange={ handleSearch('sizeMin') }
                        label="Min"
                    />
                </div>
                <div style={ doubleRight }>
                    <TextInput type="number"
                        value={ search.sizeMax }
                        onChange={ handleSearch('sizeMax') }
                        label="Max"
                    />
                </div>
            </div>
            <div style={ dropDowns } >
                <DropDown options={ [
                        { value: 2, text: 'Name' },                        
                        { value: 7, text: 'Size' },
                        { value: 10, text: 'Status' },
                    ] }
                    label="Sort By"
                    onChange={ handleSearch('sortBy') }
                    value={ search.sortBy }                        
                />
                <DropDown options={ [
                        { value: 'ASC', text: 'ASC' },
                        { value: 'DESC', text: 'DESC' },
                    ] }
                    label="ASC/DESC"
                    onChange={ handleSearch('direction') }
                    value={ search.direction }                        
                />
            </div>
        </div>
        {
            results.map((result, i) => 
                <li key={ i }>{result.name}</li>
            )
        }
    </div>

const defaultSearch = ({
    held: 'both',
    status: 'any',
    country: '',
    sortBy: 2,
    direction: 'ASC',
    sizeMin: 0,
    sizeMax: 999999,
});

export let enhance = compose(
    withRouter,
    withState('advanced', 'updateAdvanced', false),
    withState('search', 'updateSearch', defaultSearch),
    withState('results', 'updateResults', []),
    withHandlers({
        handleSearch: ({
            search, 
            updateSearch,
            updateResults,
        }) => (category) => async event => {
            let newSearch = {
                ...search, 
                [category]: event.target.value
            }
            updateSearch(newSearch);
            let results = await getCompanySearch(newSearch);
            updateResults(results);
        },
        countryClick: ({
            updateSearch,
            search,
            updateResults,
        }) => async (result) => {
            let newSearch = {
                ...search,
                country: result.text
            }
            updateSearch(newSearch);
            let results = await getCompanySearch(newSearch);
            updateResults(results);
        },
        nameClick: ({
            updateResults,
            history,
        }) => (result) => {
            history.push('/company/' + result.results.id);
        },
    }),
);

export default enhance(companySearch)