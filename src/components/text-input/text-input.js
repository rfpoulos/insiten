import React from 'react';
import {
    input,
} from './text-input-style';

export default ({ 
    type, 
    placeholder, 
    value, 
    onChange,
    style,
    onFocus,
    onBlur,
    onClick,
    maxLength,
}) =>
    <input style={ input }
        type={ type }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange } 
        onClick={ onClick }
        onFocus={ onFocus }
        onBlur={ onBlur }
        maxLength={ maxLength }
    />