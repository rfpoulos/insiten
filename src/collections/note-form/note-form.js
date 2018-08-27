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
    getContactsSearch,
    postNote,
} from './note-form-helpers';
import Title from '../../components/page-title/page-title';
import Button from '../../components/button/button';
import TextArea from '../../components/text-area/text-area';
import NoteCard from '../../iterables/note/note';
import Autocomplete from '../autocomplete/autocomplete';
import Contact from '../../iterables/contact/contact';
import DropDown from '../../components/drop-down/drop-down';

export let noteForm = ({
    newNote,
    noteChange,
    notesOn,
    notesOff,
    notes,
    companyId,
    contactClick,
    results,
    submitNote,
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
                    <DropDown options={[
                            { value: 'General', text: 'General'},
                            { value: 'Phone', text: 'Phone' },
                            { value: 'Email', text: 'Email' },
                        ]}
                        label="Type of Note/Contact"
                        value={ newNote.type }
                        onChange={ noteChange('type') }
                    />
                </div>
                {
                    newNote.type !== 'General' &&
                    <div style={ input }>
                        <Autocomplete label="Search Contacts"
                            placeholder="Name, phone, or email"
                            resultOnClick={ contactClick }
                            fetchRequest={ getContactsSearch(companyId) }
                            mapCallBack={ result => ({
                                    result: result,
                                    text: result.name,
                                })
                            }
                        /> 
                    </div>
                }
                {
                    results.map((contact, i) =>
                        <div key={ i }
                            style={ input }
                        >
                            <Contact contact={ contact }
                                id={ i }
                            />
                        </div>
                    )
                }
                <div style={ input }>
                    <TextArea label="New Note" 
                        value={ newNote.note }
                        onChange={ noteChange('note') }
                    />
                </div>
                <div style={ input }>
                    <Button text="Submit Note" 
                        onClick={ submitNote }
                    />
                </div>
            </div>
        }
        {
            notes.map((note, i) =>
                <div key={ i }
                    style={ input }
                >
                    <NoteCard id={ i }
                        note={ note }
                    />
                </div>
        )}
    </div>

export let enhance = compose(
    withState('newNote', 'updateNote', false),
    withState('notes', 'notesUpdate', []),
    withState('results', 'updateResults', []),
    withHandlers({
        notesOn: ({
            updateNote,
            company,
            companyId,
        }) => () => {
            updateNote({
                note: '',
                type: 'General',
                companyId: companyId,
                contactId: null,
            })
        },
        notesOff: ({
            updateNote
        }) => () => {
            updateNote(false)
        },
        noteChange: ({
            newNote,
            updateNote,
        }) => category => event => {
            let note = {
                ...newNote,
                [category]: event.target.value
            }
            updateNote(note);
        },
        contactClick: ({
            updateResults,
            updateNote,
            newNote,
        }) => (result) => {
            let note = {
                ...newNote,
                contactId: result.result.id
            }
            updateNote(note);
            updateResults([result.result]);
        },
        submitNote: ({
            newNote,
            notesUpdate,
            updateNote,
            updateResults,
        }) => async () => {
            let note = {
                ...newNote,
                timestamp: new Date()
            }
            let updatedNotes = await postNote(note);
            notesUpdate(updatedNotes);
            updateNote(false);
            updateResults([]);
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

