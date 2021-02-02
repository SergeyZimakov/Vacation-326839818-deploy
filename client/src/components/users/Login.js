import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {logIn} from '../../redux/users/usersActions';
import Errors from '../errors/Errors';
import './FormStyle.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.userNameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = { }
    }

    handleLogIn() {
        const userName = this.userNameInput.current.value;
        const password = this.passwordInput.current.value;
        this.props.onLogIn({userName, password});
    }

    render() {
        if (this.props.user) {
            return <Redirect to="/home" />;
        }
        return (
            <div className='container'>
                <div className='box'>
                    <div><Errors /></div>
                    <div>
                        <h1 className='formStyle-text'>LOG IN</h1>
                        <p className='formStyle-text'>A new user? You can register <a href='/register'>here</a></p>
                        </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="User Name..." ref={this.userNameInput} />
                        <label>User Name:</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password..." ref={this.passwordInput} />
                        <label>Password:</label>
                    </div>
                    <div><button type="button" className="btn btn-outline-primary" onClick={() => this.handleLogIn()}>Log In</button></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser
});

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (data) => dispatch(logIn(data)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);