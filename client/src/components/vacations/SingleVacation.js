import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeFollow, makeUnFollow } from '../../redux/follows/followsActions';
import { deleteVacation } from '../../redux/vacations/vacationsActions';
import { convertDate } from '../utils/convertDate';
import EditVacation from './EditVacation';
import './SingleVacation.css';
import './ModalWindow.css';

class SingleVacation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isFollowed: false,
            editVacationClassName: 'modal modal-hide'
         }
    }

    handleDelete() {
        this.props.onDeleteVacation(this.props.vacation.id);
    }

    handleFollow() {
        if (this.props.isFollowed) {
            this.props.onMakeUnFollow({userId: this.props.user.id, vacationId: this.props.vacation.id});
        }
        else {
            this.props.onMakeFollow({userId: this.props.user.id, vacationId: this.props.vacation.id});
        }
    }

    editVacationClassNameToggle() {
        const className = this.state.editVacationClassName === 'modal modal-hide' ? 'modal modal-show' : 'modal modal-hide';
        this.setState({editVacationClassName: className}); 
    }
  
    render() {
        const v = this.props.vacation;
        const user = this.props.user;
        return (
            <div className="card">
                <div className='card-top'>
                    <p className="card-title">{v.destination}</p>
                    <p className="card-text">{convertDate(v.FromDate)} - {convertDate(v.ToDate)}</p>
                    <p className="card-text">${v.price}</p>
                    <img className="card-img-top" src={v.image} alt="tour" />
                </div>
                <div className="card-body">
                    <p className="card-text">{v.description}</p>
                    <p className="card-text">{v.follows} followers</p>
                    <div className='singleVacation-buttons'>
                        {user.role === 'admin' && <div><i className="bi bi-pencil" onClick={() => this.editVacationClassNameToggle()}></i></div>}
                        {user.role === 'admin' && <div><i className="bi bi-trash" onClick={() => this.handleDelete()}></i></div>}
                        {user.role === 'user' && <div><i onClick={() => this.handleFollow()} className={"bi bi-eye" + (this.props.isFollowed ? '-fill' : '')}>Follow</i></div>}
                    </div>
                    {user.role === 'admin' && <div className={this.state.editVacationClassName}>
                        <i className="bi bi-x-circle-fill" onClick={() => this.editVacationClassNameToggle()}></i>
                        <div className='modal-content'>
                            <EditVacation vacation={v} closeModal={() => this.editVacationClassNameToggle()}/>
                        </div>
                    </div>}
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
        onDeleteVacation: (id) => dispatch(deleteVacation(id)),
        onMakeFollow: (data) => dispatch(makeFollow((data))),
        onMakeUnFollow: (data) => dispatch(makeUnFollow((data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleVacation);