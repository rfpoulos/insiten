import React from 'react';
import TextInfo from '../components/text-info/text-info';
import {
    container,
    line,
} from './contact-style';

export default ({
    contact,
    id,
    onClick,
}) =>
    <div style={ container }
        onClick={ onClick }
    >
        <div style={ line }>
            <TextInfo id={ 'name' + id }
                label="Name"
                text={ contact.name }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'phone' + id }
                label="Phone:"
                text={ contact.phone }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'email' + id }
                label="Email:"
                text={ contact.email }
            />
        </div>
    </div>
