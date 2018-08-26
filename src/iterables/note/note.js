import React from 'react';
import TextInfo from '../components/text-info/text-info';
import {
    container,
    line,
} from './note-style';

export default ({
    note,
    id,
    onClick,
}) =>
    <div style={ container }
        onClick={ onClick }
    >
        {
            note.name &&
            <div style={ line }>
                <TextInfo id={ 'contacted' + id }
                    label="Contacted:"
                    text={ note.name }
                />
            </div>
        }
        <div style={ line }>
            <TextInfo id={ 'contactedBy' + id }
                label="Contacted By:"
                text={ note.username }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'type' + id }
                label="Type:"
                text={ note.type }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'time' + id }
                label="Time:"
                text={ new Date(note.timestamp).toLocaleString() }
            />
        </div>
        <div style={ line }>
            <TextInfo id={ 'note' + id }
                label="Note:"
                text={ note.note }
            />
        </div>
    </div>
