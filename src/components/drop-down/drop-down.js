import React from 'react';
import Icon from '../svg-icon/medium/medium';
import {
    container,
    select
} from './drop-down-style';

export default ({
    iconSvg, 
    alt, 
    onChange,
    value,
    options,
}) =>
    <div style={ container }>
        <Icon src={ iconSvg }
            alt={ alt }
        />
            <select style={ select }
                onChange={ onChange } 
                value={ value }
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