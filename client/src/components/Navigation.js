import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
    
    render() { 
        const {user} = this.props;
        return ( 
            <div className='navigation d-flex flex-wrap justify-content-between'>
                <div className='menu d-flex flex-wrap justify-content-start'>
                    <Link className='navigation-item' to='/home'>Home</Link>
                    {!user && <Link className='navigation-item' to="/login">Log In</Link>}
                    {!user && <Link className='navigation-item' to="/register">Register</Link>}
                    {user && user.role === 'admin' && <Link className='navigation-item' to="/vacations">Vacations</Link>}
                    {user && user.role === 'admin' && <Link className='navigation-item' to="/follows">Follows graph</Link>}
                    {user && <Link className='navigation-item' to="/logout">Log Out</Link>}
                </div>
                {user && <div className='name'>Hello, {user.firstName} {user.secondName}!</div>}  
            </div>
         );
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser
});

const mapDispatchToProps = dispatch => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);