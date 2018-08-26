import React from 'react';
import {
    compose,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose';
import {
    container,
    input,
    doubleLeft,
    doubleRight,
    dropDowns,
} from './company-form-style';
import {
    googlePlacesAutocomplete,
} from './company-form-helpers';
import GoogleAttr from '../../components/google-attr/google-attr';
import TextInput from '../../components/text-input/text-input';
import Button from '../../components/button/button';
import TextArea from '../../components/text-area/text-area';
import PageTitle from '../../components/page-title/page-title';
import Autocomplete from '../autocomplete/autocomplete';
import HeldDropDown from '../../configured/held-dropdown/held-dropdown';
import StatusDropDown from '../../configured/status-drop-down/status-drop-down';

export let addCompany = ({
    company,
    handleForm,
    submitCompany,
    placeClick,
    title,
    button,
}) =>
    <div style={ container }>
        <PageTitle text={ title }/>
        <div style={ input }>
            <TextInput placeholder="Name"
                type="text"
                value={ company.name }
                onChange={ handleForm('name') }
                label="Name"
            />
        </div>
        <div style={ input } >
            <Autocomplete label="Find Address"
                placeholder="Search Google"
                resultOnClick={ placeClick }
                fetchRequest={ googlePlacesAutocomplete }
                mapCallBack={ result => {
                    if (result.place_id) {
                        return ({
                            terms: result.terms,
                            text: result.description,
                            placeId: result.place_id,
                        })
                    }
                }}
                bottomFixedResults={[
                    { text: <GoogleAttr /> }
                ]}
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
                value={ company.description }
                onChange={ handleForm('description') }
                label="Description"
            />
        </div>
        <div style={ input }>
            <div style={ dropDowns }>
                <HeldDropDown value={ company.public }
                    onChange={ handleForm('public') }
                />
                <StatusDropDown value={ company.status }
                    onChange={ handleForm('status') }
                />
            </div>
        </div>
        <div style={ input }>
            <Button text={ button } 
                onClick={ submitCompany(company) }
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
    lifecycle({
        componentDidUpdate(props) {
            if (this.props.companyInfo !== props.companyInfo) {
                this.props.updateCompany(this.props.companyInfo)
            }
        }
    }),
)

export default enhance(addCompany);