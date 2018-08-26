import React from 'react';
import TextInfo from '../components/text-info/text-info';
import {
    container,
    line,
} from './company-style';

export default ({
    company,
    id,
    onClick,
}) =>
    <div style={ container }
        onClick={ onClick }
    >
        <div style={ line }>
            <TextInfo id={ 'name' + id }
                label="Name"
                text={ company.name }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'size' + id }
                label="Size"
                text={ company.employees + ' employees' }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'held' + id }
                label="Held"
                text={ company.public ? 'Public' : 'Private' }
            />
            <TextInfo id={ 'status' + id }
                label="Status"
                text={ company.status.toUpperCase() }
            />
        </div>
    </div>
