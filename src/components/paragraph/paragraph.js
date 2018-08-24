import React from 'react';
import {
    paragraph,
    container,
    labelStyle,
} from './paragraph-style';

export default ({
    text,
    label,
}) =>
    <div style={ container }>
        <label htmlFor={ label }
            style={ labelStyle }
        >
            { label }
        </label>
        <p style={ paragraph } 
        id={ label }
        >
            { text }
        </p>
    </div>