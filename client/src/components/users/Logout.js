import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/users/usersActions';
import './FormStyle.css';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' }
    }

    componentDidMount() {
        const {user} = this.props;
        if (user) {
            const name = user.firstName + ' ' + user.secondName;
            this.setState({ name });
            this.props.onLogout();
        }
    }
    
    render() {
        return (
            <div className='box'>
                <h1 className='formStyle-text'>
                    Good Bye {this.state.name} :)<br />
                </h1>
                <h2 className='formStyle-text'>Hope you will come back soon !!!</h2>
                <br /><br /><br />
                <h4 className='formStyle-text'>Now you can <a href="/login">Sign In</a> or <a href="/register">Register a new user</a></h4>          
            </div>
         );
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser
});

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Logout);