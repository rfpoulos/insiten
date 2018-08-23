import React from 'react';
import { signIn } from './sign-in-helpers';
import { connect } from 'react-redux';
import { 
    withRouter, 
    Link,
} from 'react-router-dom';
import { 
    compose, 
    withState, 
    withHandlers,
} from 'recompose';
import { updateUser } from '../../redux/actions';
import TextInput from '../../components/text-input/text-input';
import Button from '../../components/button/button';
import {
    container,
    input,
} from './sign-in-style';

export let SignIn = ({ 
    signInForm, 
    handleForm, 
    updateUser,
    history,
}) =>
    <div style={ container }>
        <div style={ input }>        
            <TextInput type="text" 
                placeholder="Email or Username"
                value={ signInForm.identifier }
                onChange={ handleForm('identifier') }
            />
        </div>
        <div style={ input }>        
            <TextInput type="password"
                placeholder="Password"
                value={ signInForm.password }
                onChange={ handleForm('password') }
            />
        </div>
        <Button text="Sign In" 
            onClick={ signIn(signInForm, updateUser, history) }
        />
        <Link to="/createaccount">New user?  Create Account.</Link>
    </div>

let mapStateToProps = (state) => 
    ({

    });

let mapDispatchToProps = (dispatch) => 
    ({
        updateUser: (user) => 
            dispatch(updateUser(user)),
    });

export let enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter,
    withState(
        'signInForm', 
        'updateSignInForm', 
        { identifier: '', password: '' }
    ),
    withHandlers({
        handleForm: ({
                signInForm, 
                updateSignInForm,
            }) => (category) => event => 
                updateSignInForm({
                    ...signInForm, 
                    [category]: event.target.value
            }),
    }),
);

export default enhance(SignIn);