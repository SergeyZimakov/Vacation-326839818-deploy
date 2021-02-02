import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, setUserNotRegistered } from '../../redux/users/usersActions';
import Errors from '../errors/Errors';
import './FormStyle.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.firstName = React.createRef();
        this.secondName = React.createRef();
        this.userName = React.createRef();
        this.password = React.createRef();
        this.state = {  }
    }

    componentWillUnmount() {
        this.props.onSetUserNotRegistered();
    }
    
    componentDidMount() {
        this.props.onSetUserNotRegistered();
    }

    handleRegister() {
        const firstName = this.firstName.current.value;
        const secondName = this.secondName.current.value;
        const userName = this.userName.current.value;
        const password = this.password.current.value;
        const data = { firstName, secondName, userName, password };
        this.props.onRegister(data)
    }

    render() { 
        return ( 
            <div className='container'>
                <div className='box'>
                    {!this.props.userRegistered && <div>
                        <div><Errors /></div>
                        <div>
                            <h1 className='formStyle-text'>REGISTER</h1>
                            <p className='formStyle-text'>Already have an account? You can sign in <a href='/login'>here</a></p>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="User Name..." ref={this.firstName} />
                            <label>First Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="User Name..." ref={this.secondName} />
                            <label>Second Name:</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="User Name..." ref={this.userName} />
                            <label>User Name:</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="Password..." ref={this.password} />
                            <label>Password:</label>
                        </div>
                        <div><button type="button" className="btn btn-outline-primary" onClick={() => this.handleRegister()}>Create My Accaunt</button></div>
                    </div>}
                    {this.props.userRegistered && <div>
                        <h2 className='formStyle-text'>Thank You for registration!!!</h2>
                        <h2 className='formStyle-text'>Now you can to <a href="/login">Sign In</a></h2>
                    </div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userRegistered: state.users.userRegistered
});

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (data) => dispatch(register(data)),
        onSetUserNotRegistered: () => dispatch(setUserNotRegistered()),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Register);