import React, {Component} from 'react'
import {fetchAProblem} from '../../store/problem'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Input from './Input'

class Problem extends Component {
  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      await this.props.getAProblem(Number(this.props.id))
    }
  }

  render() {
    if (this.props.problem) {
      return (
        <div className="outer">
          <div className="problem-container">
              <h2>{this.props.problem.title}</h2>

            <div>
              <p>{this.props.problem.prompt}</p>
            </div>
          </div>

          <div className="input-container">
            <Input
              problem={this.props.problem}
              hidden={this.props.hidden}
              handleExit={this.props.handleExit}
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  problem: state.problemsReducer.problem
})

const mapDispatchToProps = dispatch => ({
  getAProblem: problemId => dispatch(fetchAProblem(problemId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Problem))
