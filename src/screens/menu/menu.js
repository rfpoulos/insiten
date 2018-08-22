import React from 'react';
import { withRouter } from 'react-router-dom';
import { route } from '../../helpers';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import {
    container,
    nav,
    li,
} from './menu-style';
import Hamburger from '../../images/bars-solid.svg';
import Icon from '../../components/svg-icon/medium/medium';

export let Menu = ({ 
    history,
    handleToggle,
    menuOpen,
}) =>
    <nav onClick={ handleToggle } style={ container }>
        <Icon
            src={ Hamburger } 
            onClick={ handleToggle } 
            alt="Open menu / user image"
        />
        {
            menuOpen &&
            <ul style={ nav }>
                <li style={ li }
                    onClick={ route(history, 'search') }>
                    Search
                </li>
                <li style={ li }
                    onClick={ route(history,'add') }>
                    Add
                </li>
            </ul>
        }
    </nav>


export let enhance = compose(
    withRouter,
    withState('menuOpen', 'menuToggle', false),
    withHandlers({
        handleToggle: ({ menuOpen, menuToggle }) =>
            () => menuToggle(!menuOpen)
    }),
);

export default enhance(Menu);