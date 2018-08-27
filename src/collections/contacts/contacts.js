import React from 'react';
import {
    container,
    input
} from './contacts-style';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import Title from '../../components/page-title/page-title';
import Contact from '../../iterables/contact/contact';
import Autocomplete from '../autocomplete/autocomplete';
import Button from '../../components/button/button';
import {
    getContactsSearch,
} from '../note-form/note-form-helpers';
import {
    getAllContacts,
} from './contacts-helpers';
import ContactForm from '../add-contact/add-contact';

export let contacts = ({
    results,
    contactClick,
    companyId,
    updateAddForm,
    addForm,
    allContacts,
    updateResults,
    makeEdit,
}) =>
    <div style={ container }>
        <Title text="Contacts" />
        {   !addForm &&
            <div style={ input }>
                <Button text="Add"
                    onClick={ () => updateAddForm(true) }
                />
            </div>
        }
        {
            addForm &&
            <div style={ input }>
                <Button text="Cancel" 
                    onClick={ () => updateAddForm(false) }
                />
                <ContactForm companyId={ companyId }/>
            </div>
        }
        <div style={ input }>
            <Autocomplete label="Search Contacts"
                placeholder="Name, phone, or email"
                resultOnClick={ contactClick }
                fetchRequest={ getContactsSearch(companyId) }
                mapCallBack={ result => ({
                        result: result,
                        text: result.name,
                    })
                }
            /> 
        </div>
        <div style={ input }>
            <Button text="All" 
                onClick={ allContacts }
            />
        </div>
        {
            results.map((contact, i) =>
                <div key={ i }
                    style={ input }
                >
                    {
                        contact.edit &&
                        <div style={ input }>
                            <ContactForm toEditContact={ contact } 
                            />
                            <Button text="Finish"
                                onClick={ makeEdit(i, false) }
                            />
                        </div>
                    }
                    {
                        !contact.edit &&
                        <div style={ input }>
                            <div style={ input }>
                                <Contact contact={ contact }
                                    id={ i }
                                />
                            </div>
                            <div style={ input }>
                                <Button text="Edit"
                                    onClick={ makeEdit(i, true)}
                                />
                            </div>
                        </div>
                    }
                </div>
            )
        }
        {   results.length > 0 &&
            <div style={ input }>
                <Button text="Clear" 
                    onClick={ () => updateResults([]) }
                />
            </div>
        }
    </div>

export let enhance = compose(
    withState('results', 'updateResults', []),
    withState('addForm', 'updateAddForm', false),
    withHandlers({
        contactClick: ({
            updateResults,
        }) => (result) => {
            updateResults([result.result]);
        },
        allContacts: ({
            companyId,
            updateResults,
        }) => async () => {
            let contacts = await getAllContacts(companyId);
            updateResults(contacts);
        },
        makeEdit: ({
            results,
            updateResults,
        }) => (key, value) => () => {
            let newResults = [...results];
            newResults[key].edit = value;
            updateResults(newResults);
        }
    }),
);

export default enhance(contacts)