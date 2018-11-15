import React, {Component} from 'react';
import {fetchAProblem} from '../../store/problem'
import {connect} from 'react-redux'


class Problem extends Component {

    async componentDidMount () {
        await this.props.getAProblem(this.props.match.params.problemId)
    }

    render () {
        
        return (
            <div className="problem-container">
                <ul>
                    <li>{this.props.problem.title}</li>
                    <li>{this.props.problem.prompt}</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    problem: state.problemsReducer
})

const mapDispatchToProps = dispatch => ({
    getAProblem: (problemId) => dispatch(fetchAProblem(problemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Problem)