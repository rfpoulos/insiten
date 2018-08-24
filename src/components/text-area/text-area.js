import React from 'react';
import {
    input,
    container,
} from './text-area-style';

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
    label,
}) =>
    <div style={ container }>
        <label htmlFor={ label }>{ label + ': ' }</label>
        <textarea style={ input }
            type={ type }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange } 
            onClick={ onClick }
            onFocus={ onFocus }
            onBlur={ onBlur }
            maxLength={ maxLength }
            rows="6"
        />
    </div>