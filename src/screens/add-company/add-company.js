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
    submitCompany,
    handleForm,
}) =>
    <CompanyForm 
        submitCompany={ submitCompany }
        handleForm={ handleForm }
        title="Add Company"
        button="Submit"
    />

export let enhance = compose(
    withRouter,
    withHandlers({
        submitCompany: ({
            history,
        }) => company => async event => {
            let postedCompany = await postCompany(company);
            if (postedCompany.id) {
                history.push('/company/' + postedCompany.id)
            }
        },
    }),
)

export default enhance(addCompany);