import React from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    container,
    input,
    doubleLeft,
    doubleRight,
    dropDowns,
} from './company-form-style';
import TextInput from '../../components/text-input/text-input';
import Button from '../../components/button/button';
import TextArea from '../../components/text-area/text-area';
import PageTitle from '../../components/page-title/page-title';
import DropDown from '../../components/drop-down/drop-down';
import PlacesAutocomplete from '../../collections/places-autocomplete/places-autocomplete';

export let addCompany = ({
    company,
    handleForm,
    submitCompany,
    placeClick,
}) =>
    <div style={ container }>
        <PageTitle text="Add New Company"/>
        <div style={ input }>
            <TextInput placeholder="Name"
                type="text"
                value={ company.name }
                onChange={ handleForm('name') }
                label="Name"
            />
        </div>
        <div style={ input } >
            <PlacesAutocomplete 
                resultOnClick={ placeClick }
            />       
        </div>
        <div style={ input }>
            <TextInput placeholder="Address"
                type="text"
                value={ company.address }
                onChange={ handleForm('address') }
                label="Address"
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="City"
                type="text"
                value={ company.city }
                onChange={ handleForm('city') }
                label="City"
            />
        </div>
        <div style={ input }>
            <div style={ doubleLeft }>
                <TextInput placeholder="State"
                    maxLength="2"
                    value={ company.state }
                    onChange={ handleForm('state') }
                    label="State"
                />
            </div>
            <div style={ doubleRight }>
                <TextInput placeholder="Country"
                    type="text"
                    value={ company.country }
                    onChange={ handleForm('country') }
                    label="Country"
                />
            </div>
        </div>
        <div style={ input }>
            <TextInput placeholder="Founded"
                type="date"
                value={ company.founded }
                onChange={ handleForm('founded') }
                label="Founded"
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Employees"
                type="number"
                value={ company.employees }
                onChange={ handleForm('employees') }
                label="Number of Employees"
            />
        </div>
        <div style={ input }>
            <TextArea placeholder="Description"
                value={ company.desription }
                onChange={ handleForm('description') }
                label="Description"
            />
        </div>
        <div style={ input }>
            <div style={ dropDowns }>
                <DropDown options={ [
                    { value: true, text: 'Public'},
                    { value: false, text: 'Private'}
                ] }
                    onChange={ handleForm('public') }
                    value={ company.public }
                    label={ 'Owned' }
                />
                <DropDown options={ [
                    { value: 'none', text: 'none' },
                    { value: 'pending', text: 'Pending' },
                    { value: 'approved', text: 'Approved' },
                    { value: 'declined', text: 'Declined' }
                ] }
                    onChange={ handleForm('status') }
                    value={ company.status }
                    label={ 'Status' }
                />
            </div>
        </div>
        <div style={ input }>
            <Button text="Add Company" 
                onClick={ submitCompany }
            />
        </div>
    </div>

export let enhance = compose(
    withState('company', 'updateCompany', {
        name: '',
        public: true,
        address: '',
        city: '',
        state: '',
        country: '',
        founded: '',
        employees: '',
        description: '',
        status: 'none',
    }),
    withHandlers({
        handleForm: ({
            company,
            updateCompany,
        }) => (category) => event => {
            let newCompany = {
                ...company,
                [category]: event.target.value
            };
            updateCompany(newCompany);
        },
        placeClick: ({
            updateCompany,
            company,
            placesSearch,
        }) => (result) => {
            let newCompany = {
                ...company,
                address: result.terms[0].value + 
                    ' ' + result.terms[1].value,
                city: result.terms[2].value,
                state: result.terms[3].value,
                country: result.terms[4].value,
            }
            updateCompany(newCompany);
        }
    }),
)

export default enhance(addCompany);