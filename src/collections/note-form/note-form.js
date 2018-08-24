import React from 'react';
import {
    compose,
    withState,
    withHandlers,
    lifecycle,
} from 'recompose';
import {
    container,
    input,
    noteStyle,
} from './note-form-style';
import {
    getNotes,
} from './note-form-helpers';
import Title from '../../components/page-title/page-title';
import Button from '../../components/button/button';
import TextArea from '../../components/text-area/text-area';

export let noteForm = ({
    newNote,
    notesOn,
    notesOff,
    notes,
}) => 
    <div style={ container } >
        <Title text="Notes" />
        {
            !newNote &&
            <div style={ input }>
                <Button text="Add Note"
                    onClick={ notesOn }
                />
            </div>
        }
        {
            newNote &&
            <div style={ noteStyle } >
                <div style={ input }>
                    <Button text="Cancel Note"
                        onClick={ notesOff }
                    />
                </div>
                <div style={ input }>
                    <TextArea label="New Note" />
                </div>
                <div style={ input }>
                    <Button text="Submit Note" />
                </div>
            </div>
        }
        {
            notes.map((note, i) =>
                <li key={ i }>{ note.note + ' ' + 
                    new Date(note.timestamp)
                    .toLocaleString("en-US") 
                }</li>
        )}
    </div>

export let enhance = compose(
    withState('newNote', 'updateNote', false),
    withState('notes', 'notesUpdate', []),
    withHandlers({
        notesOn: ({
            updateNote,
            company,
            companyId,
        }) => () => {
            updateNote({
                note: '',
                type: 'general',
                company: companyId,
                contact: null,
            })
        },
        notesOff: ({
            updateNote
        }) => () => {
            updateNote(false)
        },
    }),
    lifecycle({
        async componentDidMount(){
            let allNotes = await getNotes(this.props.companyId);
            this.props.notesUpdate(allNotes);
        }
    }),
);

export default enhance(noteForm);

