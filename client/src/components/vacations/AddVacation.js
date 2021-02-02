import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addVacation } from '../../redux/vacations/vacationsActions';

class AddVacation extends Component {
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
        const form = new FormData();
        form.append('destination', this.destination.current.value);
        form.append('description', this.description.current.value);
        form.append('price', this.price.current.value);
        form.append('FromDate', this.FromDate.current.value);
        form.append('ToDate', this.ToDate.current.value);
        form.append('image', this.img.current.files[0]);
        console.log(form);
        if(
            !this.destination.current.value ||
            !this.description.current.value ||
            !this.price.current.value ||
            !this.FromDate.current.value ||
            !this.ToDate.current.value ||
            !this.img.current.files[0] 
        ) {
            alert('One ore more data is missing');
        }
        else {
            this.props.onAddVacation(form);
            this.props.closeModal();
        }
    }

    render() {
        return (
            <div>
                <h4 className='formStyle-text'>Add new vacation</h4>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder='destination' ref={this.destination} />
                    <label>Destination:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder='description' ref={this.description} />
                    <label>Description:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder='price' ref={this.price} />
                    <label>Price:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" className="form-control" placeholder='from' ref={this.FromDate} />
                    <label>From:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="date" className="form-control" placeholder='to' ref={this.ToDate} />
                    <label>To:</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="file" className="form-control" placeholder='image' ref={this.img} />
                    <label>Image:</label>
                </div>
                <div><button type="button" className="btn btn-outline-primary" onClick={() => this.submitForm()}>Add</button></div>
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
        onAddVacation: (data) => dispatch(addVacation(data)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddVacation);