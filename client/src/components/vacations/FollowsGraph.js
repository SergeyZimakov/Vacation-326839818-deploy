import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';

class FollowsGraph extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = { style: { height: '50%', width: '70%' } }
    }

    componentDidMount() {
        const labels = [];
        const data = [];
        const {vacations} = this.props;
        vacations.forEach(v => {
            labels.push(v.destination);
            data.push(v.follows);            
        });
        const myChartRef = this.chartRef.current.getContext("2d");  
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Follows',
                        data: data,
                        backgroundColor: 'rgba(127, 3, 78)',
                        hoverBackgroundColor: 'rgba(127, 3, 78, 0.7)',
                        borderWidth: 1,
                        hoverBorderColor: 'rgba(127, 3, 78)',
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 1
                        }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div>
                <div style={this.state.style}>
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.currentUser,
    vacations: state.vacations.vacations
});

const mapDispatchToProps = null;
 
export default connect(mapStateToProps, mapDispatchToProps)(FollowsGraph);