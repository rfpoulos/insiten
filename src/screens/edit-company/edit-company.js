import React from 'react';
import {
    compose,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose';
import { withRouter } from 'react-router-dom';
import CompanyForm from '../../collections/company-form/company-form';
import { getCompanyById } from '../company-detail/company-detail-helpers';
import { putCompany } from './edit-company-helpers';

export let addCompany = ({
    companyInfo,
    submitCompany,
    handleForm,
}) =>
    <CompanyForm companyInfo={ companyInfo }
        submitCompany={ submitCompany }
        handleForm={ handleForm }
        title="Edit Company"
        button="Update"
    />

export let enhance = compose(
    withRouter,
    withState('companyInfo', 'updateCompanyInfo', {
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
        submitCompany: ({
            history,
            match
        }) => company => async event => {
            let addedCompany = await putCompany(company);
            if (addedCompany[0].id) {
                history.push('/company/' + addedCompany[0].id)
            }
        },
    }),
    lifecycle({
        async componentDidMount(){
            let company = await getCompanyById(this.props.match.params.companyId);
            company = company[0];
            let founded = new Date(company.founded);
            let day = founded.getDate();
            let month = founded.getMonth() + 1;
            let year = founded.getFullYear();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            company.founded = year + '-' + month + '-' + day;
            this.props.updateCompanyInfo(company);
        }
    }),
)

export default enhance(addCompany);