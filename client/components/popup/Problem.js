import React, {Component} from 'react'
import {fetchAProblem} from '../../store/problem'
import {connect} from 'react-redux'
import Input from './Input'

class Problem extends Component {
  async componentDidMount() {
    console.log('ididididi', this.props)
    await this.props.getAProblem(this.props.id)
  }

  render() {
    console.log('ididididi', this.props)
    return (
      <div className="problem-container">
        <ul>
          <li>{this.props.problem.id}</li>
          <li>{this.props.problem.title}</li>
        </ul>

        <Input problem={this.props.problem} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  problem: state.problemsReducer.problem
})

const mapDispatchToProps = dispatch => ({
  getAProblem: problemId => dispatch(fetchAProblem(problemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Problem)
