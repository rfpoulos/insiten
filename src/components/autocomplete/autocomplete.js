import React from 'react';
import TextInput from '../../components/text-input/text-input';
import {
    autocomplete,
    list,
    listItem,
    listContainer,
} from './autocomplete-style'
import {
    compose, 
    withState,
} from 'recompose'

export let enhance = compose(
    withState('showResults', 'updateDisplay', false),
);

export default enhance(({
    value, 
    resultOnClick,
    onChange,
    placeholder,
    results,
    topFixedResults = [],
    bottomFixedResults = [],
    showResults,
    updateDisplay,
    label,
}) =>
    <div style={ autocomplete } >
        <TextInput type="text"
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
            onFocus={ () => updateDisplay(true) }
            label={ label }
        />
        {   showResults &&
            <div style={ listContainer }>
                <ul style={ list }>
                {
                    topFixedResults.map((result, i) =>
                        <li key={ i }
                            style={ listItem }
                            onClick={ () => {
                                updateDisplay(false)
                                if (result.onClick) {
                                    result.onClick(result)
                                }
                            } }
                        >
                            { result.text }
                        </li>
                    )
                }
                {
                    results.map((result, i) =>
                        <li key={ i }
                            style={ listItem }
                            onClick={ () => {
                                updateDisplay(false)
                                resultOnClick(result)
                            } }
                        >
                            { result.text }
                        </li>
                    )
                }
                {
                    bottomFixedResults.map((result, i) =>
                        <li key={ i }
                            style={ listItem }
                            onClick={ () => {
                                updateDisplay(false)
                                if (result.onClick) {
                                    result.onClick(result)
                                }
                            } }
                        >
                            { result.text }
                        </li>
                    )
                }
                </ul>
            </div>
        }
    </div>)