import React from 'react';
import {
    container,
} from './google-attr-style';
import googleAttr from '../../images/powered_by_google_on_white.png';

export default () =>
    <div style={ container }>
        <img src={ googleAttr }
            alt='Powered by Google'
        />
    </div>