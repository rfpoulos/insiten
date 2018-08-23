import React from 'react';
import {
    container,
    select
} from './drop-down-style';

export default ({
    onChange,
    value,
    options,
    label,
}) =>
    <div style={ container }>
        <label htmlFor={ label }>{ label + ': ' }</label>
        <select style={ select }
            onChange={ onChange } 
            value={ value }
            id={ label }
        >
        {
            options.map((option, i) =>
                <option key={i}
                    value={ option.value }>
                    { option.text }
                </option>
            )
        }
        </select>
    </div>