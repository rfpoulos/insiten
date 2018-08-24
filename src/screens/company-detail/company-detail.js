import React from 'react';
import {
    compose,
    withState,
    lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import {
    getCompanyById,
} from './company-detail-helpers';
import {
    container,
} from './company-detail-style';
import CompanyCard from '../../collections/company-card/company-card';
import NoteForm from '../../collections/note-form/note-form';

export let companyDetail = ({
    company,
    user,
    notes,
    match,
}) =>
    <div style={ container }>
        <CompanyCard company={ company }
            user={ user }
        />
        <NoteForm notes={ notes }
            companyId={ match.params.companyId }
        />
    </div>

let mapStateToProps = (state) => ({
    user: state.user
});

export let enhance = compose(
    connect(
        mapStateToProps,
    ),
    withState('notes', 'notesUpdate', []),
    withState('company', 'updateCompany', {
        id: '',
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        employees: '',
        founded: '',
        public: '',
        status: '',
    }),
    lifecycle({
        async componentDidMount() {
            let company = await getCompanyById(this.props.match.params.companyId);
            if (company.length) {
                this.props.updateCompany(company[0]);
            };
        }
    }),
)

export default enhance(companyDetail);