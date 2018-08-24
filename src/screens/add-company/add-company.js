import React from 'react';
import {
    compose,
    withHandlers,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import { 
    postCompany,
} from './add-company-helpers';
import CompanyForm from '../../collections/company-form/company-form';

export let addCompany = ({
    company,
    submitCompany,
    handleForm,
}) =>
    <CompanyForm company={ {
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
        } }
        submitCompany={ submitCompany }
        handleForm={ handleForm }
    />

export let enhance = compose(
    withRouter,
    withHandlers({
        submitCompany: ({
            company,
            history,
        }) => async event => {
            let postedCompany = await postCompany(company);
            if (postedCompany.id) {
                history.push('/company/' + postedCompany.id)
            }
        },
    }),
)

export default enhance(addCompany);