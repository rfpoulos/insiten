import React from 'react';
import { 
    container,
    labelStyle,
    paragraph,
} from './address-style';

export default ({
    address,
    city,
    state,
    country,
    labelKey,
}) =>
    <div style={ container }>
        <label htmlFor={ labelKey }
            style={ labelStyle }
        >
        Address:
        </label>
        <p style={ paragraph }>{ address }</p>
        <p style={ paragraph }>{ city + ', ' + state }</p>
        <p style={ paragraph }>{ country }</p>
    </div>