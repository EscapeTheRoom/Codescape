import React, {Component} from 'react'
import {fetchAProblem} from '../../store/problem'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Input from './Input'

class Problem extends Component {
  async componentDidUpdate(prevProps) {
    console.log("PREVPROPS!",prevProps)
   if(prevProps.id !== this.props.id){
    await this.props.getAProblem(Number(this.props.id))
   }
    
  }

  render() {
    console.log("ProblemProps",this.props)
    if(this.props.problem){
    return (
      <div className="outer">
        <div className="problem-container">
          <div>
            <h1>{this.props.problem.title}</h1>
          </div>

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
