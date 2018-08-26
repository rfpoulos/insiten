import React from 'react';
import {
    container,
    select
} from './drop-down-style';

let combineOptions = ( options, extraOption) => {
    if (extraOption) {
        return [...options, extraOption ]
    } else {
        return options
    }
}

export default ({
    onChange,
    value,
    options,
    label,
    extraOption = null,
}) =>
    <div style={ container }>
        <label htmlFor={ label }>{ label + ': ' }</label>
        <select style={ select }
            onChange={ onChange } 
            value={ value }
            id={ label }
        >
        {
            combineOptions(options, extraOption).map((option, i) =>
                <option key={i}
                    value={ option.value }>
                    { option.text }
                </option>
            )
        }
        </select>
    </div>