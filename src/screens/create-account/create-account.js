import React from 'react';
import { createAccount } from './create-account-helpers';
import {
    withRouter,
    Link,
} from 'react-router-dom';
import { 
    compose, 
    withState, 
    withHandlers,
} from 'recompose';
import TextInput from '../../components/text-input/text-input';
import Button from '../../components/button/button';
import {
    container,
    input,
} from './create-account-style';

export let CreateAccount = ({ 
    createAccountForm,
    handleForm, 
    history,
}) =>
    <div style={ container }>
        <div style={ input }>
            <TextInput type="email" 
                placeholder="Email"
                value={ createAccountForm.email }
                onChange={ handleForm('email') }
            />
        </div>
        <div style={ input }>        
            <TextInput type="text" 
                placeholder="Username"
                value={ createAccountForm.username }
                onChange={ handleForm('username') }
            />
            </div>
        <div style={ input }>        
            <TextInput type="password"
                placeholder="Password"
                value={ createAccountForm.password }
                onChange={ handleForm('password') }
            />
        </div>
        <div style={ input }>        
            <Button text="Create Account" 
                onClick={ 
                    createAccount(createAccountForm, history)
            } />
        </div>
        <Link to="/signin">Already a user?  Sign in here.</Link>
    </div>

export let enhance = compose(
    withRouter,
    withState(
        'createAccountForm',
        'updateCreateAccountForm',
        { email: '', password: '', username: '' }
    ),
    withHandlers({
        handleForm:({ 
                createAccountForm, 
                updateCreateAccountForm,
            }) => (category) => event => 
                updateCreateAccountForm({
                    ...createAccountForm, 
                    [category]: event.target.value
            }),
    }),
);

export default enhance(CreateAccount);