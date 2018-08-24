import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    container,
    section,
} from './company-card-style';
import Title from '../../components/page-title/page-title';
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Address from '../../components/address/address';
import { route } from '../../helpers';


export default withRouter(({
    company,
    user,
    history,
}) =>
    <div style={ container }>
        <Title text={company.name} />
        <div style={ section } >
            <Paragraph label="Status:"
                text={ company.status } 
            />
        </div>
        <div style={ section } >
            <Paragraph label="Held:"
                text={ company.public ? 'Public' : 'Private' } 
            />
        </div>
        <div style={ section } >
            <Paragraph label="Founded:"
                text={ new Date(company.founded)
                    .toLocaleDateString("en-US") } 
            />
        </div>
        <div style={ section } >
            <Paragraph label="Size:"
                text={ company.employees + ' employees' } 
            />
        </div>
        <div style={ section } >
            <Address label="Address:"
                address={ company.address }
                city={ company.city }
                state={ company.state }
                country={ company.country }
            />
        </div>
        <div style={ section } >
            <Paragraph label="Description:"
                text={ company.description } 
            />
        </div>
        <div style={ section }>
        {
            user && (user.role === 'admin') &&
            <Button text="Edit" 
                onClick={ route(
                    history, 
                    'editcompany/' + company.id
                ) }
            />
        }
        </div>
    </div>)