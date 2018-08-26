import React from 'react';
import DropDown from '../../components/drop-down/drop-down';

export default ({
    onChange,
    value,
    extraOption,
}) => 
<DropDown options={ [
    { value: 'none', text: 'none' },
    { value: 'pending', text: 'Pending' },
    { value: 'approved', text: 'Approved' },
    { value: 'declined', text: 'Declined' },
] }
    onChange={ onChange }
    value={ value }
    label="Status"
    extraOption={ extraOption }
/>