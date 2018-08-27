import React from 'react';
import {
    container,
    input
} from './contacts-style';
import {
    compose,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose';
import Title from '../../components/page-title/page-title';
import Contact from '../../iterables/contact/contact';
import Autocomplete from '../autocomplete/autocomplete';
import Button from '../../components/button/button';

export let contacts = ({
    results,
    contactClick,
    companyId,
}) =>
    <div style={ container }>
        <Title text="Contacts" />
        <div style={ input }>
            <Button text="Add Contact"
            />
        </div>
    </div>

export let enhance = compose(

);

export default enhance(contacts)