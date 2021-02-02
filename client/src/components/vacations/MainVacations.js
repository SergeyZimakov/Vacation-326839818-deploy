import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AllVacations from './AllVacations';

class MainVacations extends Component {

    render() { 
        const user = this.props.user;
        return user ? <AllVacations /> : <Redirect to='/home' />;
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser
});

const mapDispatchToProps = null;
 
export default connect(mapStateToProps, mapDispatchToProps)(MainVacations);