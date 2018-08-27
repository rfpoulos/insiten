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
} from './add-contact-style';
import TextInput from '../../components/text-input/text-input'
import Button from '../../components/button/button';
import {
    postContact,
    putContact,
} from './add-contact-helpers';
import Contact from '../../iterables/contact/contact';

export let addContact = ({
    handleForm,
    contactForm,
    submitContact,
    contact,
    newContact,
    toEditContact,
    updateContact,
}) =>
    <div style={ container }>
        <div style={ input }>
            <TextInput placeholder="Name"
                type="text"
                value={ contactForm.name }
                onChange={ handleForm('name') }
                label="Name"
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Role"
                type="text"
                value={ contactForm.role }
                onChange={ handleForm('role') }
                label="Role"
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Phone"
                type="tel"
                value={ contactForm.phone }
                onChange={ handleForm('phone') }
                label="Phone"
            />
        </div>
        <div style={ input }>
            <TextInput placeholder="Email"
                type="text"
                value={ contactForm.email }
                onChange={ handleForm('email') }
                label="Email"
            />
        </div>
        {   !toEditContact &&
            <div style={ input }>
                <Button text="Add" 
                    onClick={ submitContact }
                />
            </div>
        }
        {   toEditContact &&
            <div style={ input }>
                <Button text="Update" 
                    onClick={ updateContact }
                />
            </div>
        }
        {
            newContact &&
            <div style={ input }>
                <Contact id="added"
                    contact={ newContact }
                />
            </div>
        }
    </div>

const defaultForm = ({
    name: '',
    role: '',
    phone: '',
    email: '',
})

export let enhance = compose(
    withState('contactForm', 'updateForm', defaultForm),
    withState('newContact', 'updateContact', null),
    withHandlers({
        handleForm: ({
            contactForm,
            updateForm,
        }) => (category) => event => {
            let newContact = {
                ...contactForm,
                [category]: event.target.value
            };
            updateForm(newContact);
        },
        submitContact: ({
            contactForm,
            updateForm,
            companyId,
            updateContact,
        }) => async () => {
            let contact = {
                ...contactForm,
                companyId,
            }
            let addedContact = await postContact(contact);
            updateContact(addedContact[0]);
            updateForm(defaultForm);
        },
        updateContact: ({
            contactForm,
            updateContact,
        }) => async () => {
            let updatedContact = await putContact(contactForm);
            updateContact(updatedContact[0]);
        },
    }),
    lifecycle({
        componentDidMount() {
            if (this.props.toEditContact) {
                let contact = {
                    ...this.props.toEditContact,
                }
                this.props.updateForm(contact);
            }
        }
    }),
);

export default enhance(addContact);