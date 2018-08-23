import { Fragment } from 'react';
import { 
    compose, 
    lifecycle, 
} from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from './sign-in-redirect-helpers';
import { updateUser } from '../../redux/actions';

let mapStateToProps = (state) => 
    ({
        user: state.user,
    });

let mapDispatchToProps = (dispatch) =>
    ({
        updateUser: (user) => dispatch(updateUser(user)),
    });

let enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter,
    lifecycle({
        async componentDidMount() {
            if (localStorage.getItem('token')) {
                try {
                    let user = await fetchUser();
                    this.props.updateUser(user);
                } catch(err) {
                    localStorage.removeItem('token');
                    this.props.history.push('/signin');
                }
            } else {
                this.props.history.push('/signin');
            }
        },
        componentDidUpdate({ user }) {
            if (!this.props.user
                && this.props.history.location !== 
                ('/createaccount'|| '/signin')) {
                this.props.history.push('/signin');
            } else if (!this.props.user.role && 
                this.props.history.location !== 
                ('/createaccount'|| '/signin')) {
                this.props.history.push('/signin')
            };
        }
    }),
);

export default enhance(() => Fragment);