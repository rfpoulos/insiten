import React from 'react';
import { icon } from './small-style';

export default ({
    src,
    alt,
    onClick,
}) =>
    <img style={ icon }
        src={ src }
        alt={ alt }
        onClick={ onClick }
    />