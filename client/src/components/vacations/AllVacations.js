import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVacations } from '../../redux/vacations/vacationsActions';
import { io } from 'socket.io-client';
import AddVacation from './AddVacation';
import SingleVacation from './SingleVacation';
import './AllVacations.css';
import './ModalWindow.css';
import Errors from '../errors/Errors';

class AllVacations extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            addVacationClassName: 'modal modal-hide'
         }
    }

    componentDidMount() {
        this.props.onFetchVacations();
        const socket = io();
        socket.on("fetchAll", () => this.props.onFetchVacations());
        const idFromCookies = this.getUserIdFromCookies();
		socket.emit("user/connect", idFromCookies);
    }

    addVacationToggle() {
        const className = this.state.addVacationClassName === 'modal modal-hide' ? 'modal modal-show' : 'modal modal-hide';
        this.setState({addVacationClassName: className});
    }

    render() { 
        const user = this.props.user;
        const vacations = this.props.vacations;
        const followedVacations = this.props.followedVacations;
        return ( 
            <div>
                {user.role === 'user' && <div>
                    <h4 className='allVacations-title'>Your Followed Vacations</h4>
                    {followedVacations.length === 0 && <p>You do not have followed vacations</p>}
                    <div className='d-flex flex-wrap justify-content-start'>
                        {followedVacations.map( (v, index) => <SingleVacation key={index} vacation={v} isFollowed={true} />)}
                    </div>
                </div>}
                <hr />
                <div>
                    <h4 className='allVacations-title'>All Vacations</h4>
                    <div className='d-flex flex-wrap justify-content-start'>
                        {vacations.map( (v, index) => <SingleVacation key={index} vacation={v} isFollowed={false}/>)}
                    </div>
                </div>
                <hr />
                {user.role === 'admin' && <div>
                    <Errors />
                    <div className='addButton' onClick={() => this.addVacationToggle()}><i className="bi bi-plus-circle"></i></div>
                    <div className={this.state.addVacationClassName}>
                        <i className="bi bi-x-circle-fill" onClick={() => this.addVacationToggle()}></i>
                        <div className='modal-content'>
                            <AddVacation closeModal={() => this.addVacationToggle()}/>
                        </div>
                    </div>
                </div>}
            </div>
         );
    }

    getUserIdFromCookies() {
		const cookies = document.cookie.split(";");
		if (cookies.length === 0) {
			return null;
		}
		for (const cookie of cookies) {
			const parts = cookie.split("=");
			if (parts.length === 2) {
				if (parts[0] === "userId") {
					return parts[1];
				}
			}
		}
		return null;
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser,
    followedVacations: state.vacations.followedVacations,
    vacations: state.vacations.vacations
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchVacations: () => dispatch(fetchVacations())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllVacations);