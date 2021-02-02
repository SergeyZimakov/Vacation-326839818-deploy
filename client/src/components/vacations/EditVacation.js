import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  editVacation } from '../../redux/vacations/vacationsActions';

class EditVacation extends Component {
    constructor(props) {
        super(props);
        this.destination = React.createRef();
        this.description = React.createRef();
        this.price = React.createRef();
        this.FromDate = React.createRef();
        this.ToDate = React.createRef();
        this.ToDate = React.createRef();
        this.img = React.createRef();
    }

    submitForm() {
        const v = this.props.vacation;
        const id = v.id;
        const form = {};
        form.destination = this.destination.current.value ? this.destination.current.value : v.destination;
        form.description = this.description.current.value ? this.description.current.value : v.description;
        form.price = this.price.current.value ? this.price.current.value : v.price;
        form.FromDate = this.FromDate.current.value ? this.FromDate.current.value : v.FromDate;
        form.ToDate = this.ToDate.current.value ? this.ToDate.current.value : v.ToDate;
        console.log(form);
        this.props.onEditVacation(id, form);
        this.props.closeModal();
    }
    
    render() {
        const v = this.props.vacation;
        return ( 
            <div>
                <h4 className='formStyle-text'>Edit vacation #{v.id}</h4>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder={v.destination} ref={this.destination} />
                    <label>{v.destination}</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder={v.description} ref={this.description} />
                    <label>{v.description}</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder={v.price} ref={this.price} />
                    <label>{v.price}</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" className="form-control" placeholder={v.FromDate} ref={this.FromDate} />
                    <label>{v.FromDate}</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" className="form-control" placeholder={v.ToDate} ref={this.ToDate} />
                    <label>{v.ToDate}</label>
                </div>
                <p>(*if you want to change an image, please remove this vacation and add a new one)</p>
                <div><button type="button" className="btn btn-outline-primary" onClick={() => this.submitForm()}>Edit</button></div>
                <div><button type="button" className="btn btn-outline-primary" onClick={() => this.props.closeModal()}>Close</button></div>
                
            </div>
         );
    }
}

const mapStateToProps = state => ({
    img: state.vacations.image
});

const mapDispatchToProps = dispatch => {
    return {
        onEditVacation: (id, data) => dispatch(editVacation(id, data))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(EditVacation);