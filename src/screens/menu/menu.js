import React from 'react';
import { withRouter } from 'react-router-dom';
import { route } from '../../helpers';
import { logout } from './menu-helpers';
import { resetState } from '../../redux/actions';
import {
    compose,
    withState,
    withHandlers,
} from 'recompose';
import { connect } from 'react-redux';
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
    role,
    resetState,
}) =>
    role &&
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
                {
                    (role === 'admin') &&
                    <li style={ li }
                    onClick={ route(history,'add') }>
                    Add
                    </li>
                }
                {
                    (role === 'admin') &&
                    <li style={ li }
                    onClick={ route(history,'privileges') }>
                    Privileges
                    </li>
                }
                <li style={ li }
                    onClick={ logout(resetState, route(history, 'signin')) }>
                    Logout
                </li>
            </ul>
        }
    </nav>

let mapStateToProps = (state) => ({
    role: state.user && state.user.role
});

let mapDispatchToProps = (dispatch) =>
({
    resetState: () => dispatch(resetState()),
});

export let enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withState('menuOpen', 'menuToggle', false),
    withHandlers({
        handleToggle: ({ menuOpen, menuToggle }) =>
            () => menuToggle(!menuOpen)
    }),
);

export default enhance(Menu);