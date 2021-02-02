import React, { Component } from 'react';
import { connect } from "react-redux";
import { clearErrors } from "../../redux/errors/errorsActions";
import './Errors.css';

class Errors extends Component {
    
    componentWillUnmount() {
        this.props.onClearErrors();
    }

    render() { 
        const errors = this.props.errors;
        return ( 
            <div>
                {errors.length > 0 && <div className="errors-list card-body">
                    <ul>
                        {errors.map((err, index) => <div key={index} className="error-item"><li>{err}</li></div>)}
                    </ul>
                    <button className="errors-btn" onClick={() => this.props.onClearErrors()}>
                        Close
                    </button>
                </div>}
            </div>
         );
    }
}

const mapStateToProps = state => ({
    errors: state.errors.errorsList
});

const mapDispatchToProps = dispatch => {
	return {
		onClearErrors: () => dispatch(clearErrors())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Errors);