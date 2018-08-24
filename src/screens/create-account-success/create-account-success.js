import React from 'react';
import Paragraph from '../../components/paragraph/paragraph';
import {
    Link,
} from 'react-router-dom';
import {
    container,
    paragraph
} from './create-account-success-style';

export default () =>
    <div style={ container }>
        <div style={ paragraph }>
            <Paragraph label="Account Created" 
                text="Account successfully created.  
                You will need adminstrator approval before signing in."
            />
        </div>
        <Link to="/signin">Already a user?  Sign in here.</Link>
    </div>