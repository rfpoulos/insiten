import React from 'react';
import { button } from './button-style';

export default ({ 
    text, 
    onClick,
}) =>
    <button style={ button } 
        onClick={ onClick }>
        { text }
    </button>