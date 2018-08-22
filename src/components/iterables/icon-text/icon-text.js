import React from 'react';
import Icon from '../../svg-icon/small/small';
import {
    container,
    paragraph,
} from './icon-text-style';

export default ({
    src,
    alt,
    text,
}) =>
    <div style={ container }>
        <Icon src={ src }
            alt={ alt }
        />
        <p style={ paragraph }>
            { text }
        </p>
    </div>