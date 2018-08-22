import React from 'react';
import{
    container,
    title,
    optionsContainer,
    optionContainer,
} from './filter-options-style';

export default ({
    name,
    options,
}) =>
<div style={ container }>
    <p style={ title }>{ name }:</p>
    <div style={ optionsContainer }>
    {
        options.map((option, i) =>
            <form key={ i }
                style={ optionContainer }
            >
                <label htmlFor={ option.value }>
                    { option.value }
                </label>
                <input type="checkbox"
                    id={ option.value }
                    onChange={ option.onChange }
                />
            </form>   
    )}
    </div>
</div>