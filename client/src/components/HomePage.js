import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class HomePage extends Component {

    render() {
        const {user} = this.props;
        return user ? <Redirect to='/vacations' /> : <Redirect to='/login' />;
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser
});

const mapDispatchToProps = null;
 
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);