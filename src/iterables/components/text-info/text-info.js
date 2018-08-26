import React from 'react';
import {
    container,
    paragraph,
    labelStyle,
} from './text-info-style';

export default ({
    id,
    label,
    text,
}) =>
    <div style={ container }>
        <label htmlFor={ id }
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