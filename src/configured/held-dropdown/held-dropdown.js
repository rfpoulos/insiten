import React from 'react';
import DropDown from '../../components/drop-down/drop-down';

export default ({
    onChange,
    value,
    extraOption,
}) =>                 
<DropDown options={ [
    { value: true, text: 'Public'},
    { value: false, text: 'Private'},
] }
    onChange={ onChange }
    value={ value }
    label="Owned"
    extraOption={ extraOption }
/>