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
import Paragraph from '../../components/paragraph/paragraph';

export let SignIn = ({ 
    signInForm, 
    handleForm, 
    handleSignIn,
    user,
}) =>
    <div style={ container }>
        {
            user && (user.message === 'unauthorized') &&
            <div style={ input }>
                <Paragraph label="Error"
                    text="Not authorized yet.  Contact adminstrator to gain permissions."
                />
            </div>
        }
        {
            user && (user.message === 'not user') &&
            <div style={ input }>
                <Paragraph label="Error"
                    text="Username and/or password incorrect."
                />
            </div>
        }
        <div style={ input }>        
            <TextInput type="text" 
                placeholder="Email or Username"
                value={ signInForm.identifier }
                onChange={ handleForm('identifier') }
                label="Email or Username"
            />
        </div>
        <div style={ input }>        
            <TextInput type="password"
                placeholder="Password"
                value={ signInForm.password }
                onChange={ handleForm('password') }
                label="Password"
            />
        </div>
        <div style={ input } >
            <Button text="Sign In" 
              onClick={ handleSignIn }
            />
        </div>        
        <Link to="/createaccount">New user?  Create Account.</Link>
    </div>

let mapStateToProps = (state) => 
    ({
        user: state.user
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
        handleSignIn: ({
            signInForm,
            updateUser,
            history,
            updateSignInForm,
        }) => event => {
            signIn(signInForm, updateUser, history);
            updateSignInForm({ identifier: '', password: '' });
        }
    }),
);

export default enhance(SignIn);