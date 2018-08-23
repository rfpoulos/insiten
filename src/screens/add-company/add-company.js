import React from 'react';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    container,
    input,
} from './add-company-style';
import TextInput from '../../components/text-input/text-input';
import Button from '../../components/button/button';

export let addCompany = ({
    company,
    handleForm,
}) =>
    <div style={ container }>
        <div style={ input }>
            <TextInput placeholder="Name"
                type="text"
                value={ company.name }
                onChange={ handleForm('name') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Address"
                type="text"
                value={ company.address }
                onChange={ handleForm('address') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="City"
                type="text"
                value={ company.city }
                onChange={ handleForm('city') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="State"
                maxLength="2"
                value={ company.state }
                onChange={ handleForm('state') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Zip"
                type="text"
                maxLength="5"
                value={ company.zip }
                onChange={ handleForm('zip') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Country"
                type="text"
                value={ company.country }
                onChange={ handleForm('country') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Founded"
                type="date"
                value={ company.date }
                onChange={ handleForm('date') }
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Employees"
                type="number"
                value={ company.employees }
                onChange={ handleForm('employees') }
            />
        </div>
        <div style={ input }>
            <Button text="Add Company" />
        </div>
    </div>

export let enhance = compose(
    withState('company', 'updateCompany', {
        name: '',
        public: null,
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        founded: '',
        employees: '',
        description: '',
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
    }),
)

export default enhance(addCompany);