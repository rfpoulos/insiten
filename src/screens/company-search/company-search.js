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
} from './company-search-helpers';
import Title from '../../components/page-title/page-title';
import HeldDropDown from '../../configured/held-dropdown/held-dropdown';
import StatusDropDown from '../../configured/status-drop-down/status-drop-down';
import AutoComplete from '../../collections/autocomplete/autocomplete';
import Button from '../../components/button/button';
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
                <HeldDropDown value={ search.public } 
                    onChange={ handleSearch('public') }
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
                        value={ search.sizeStart }
                        onChange={ handleSearch('sizeStart') }
                        label="Min"
                    />
                </div>
                <div style={ doubleRight }>
                    <TextInput type="number"
                        value={ search.sizeEnd }
                        onChange={ handleSearch('sizeEnd') }
                        label="Max"
                    />
                </div>
            </div>
            <div style={ dropDowns } >
                <DropDown options={ [
                        { value: 'name', text: 'Name' },                        
                        { value: 'size', text: 'Size' },
                        { value: 'status', text: 'Status' },
                    ] }
                    label="Sort By"
                    onChange={ handleSearch('sortBy') }
                    value={ search.sortBy }                        
                />
                <DropDown options={ [
                        { value: 'up', text: 'Up' },
                        { value: 'down', text: 'Down' },
                    ] }
                    label="Up/Down"
                    onChange={ handleSearch('direction') }
                    value={ search.direction }                        
                />
            </div>
            <div style={ input }>
                <Button text="Reset"
                    onClick={ resetSearch }
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
    public: 'both',
    status: 'any',
    country: '',
    sortBy: 'name',
    direction: 'up',
    sizeStart: 0,
    sizeEnd: 999999,
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
        }) => (category) => event => 
            updateSearch({
                ...search, 
                [category]: event.target.value
        }),
        countryClick: ({
            updateSearch,
            search,
        }) => (result) => {
            let newSearch = {
                ...search,
                country: result.text
            }
            updateSearch(newSearch);
        },
        nameClick: ({
            updateResults,
            history,
        }) => (result) => {
            history.push('/company/' + result.results.id);
        },
        resetSearch: ({
            updateSearch,
            updateResults,
        }) => () => {
            updateSearch(defaultSearch);
            updateResults([]);
        },
    }),
);

export default enhance(companySearch)