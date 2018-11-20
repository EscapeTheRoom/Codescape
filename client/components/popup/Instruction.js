import React, {Component} from 'react'
import Problem from './Problem'
import TestResult from './TestResult'
import {RenderLoop} from 'brace'

class Instruction extends Component {
  constructor(props) {
    super(props) // props will be passed down including id for problem
  }

  render() {
    return (
      <div className={this.props.hidden}>
        <Problem id={this.props.problemId} handleExit={this.props.handleExit} />
        {/* <button
          className="button"
          type="submit"
          onClick={this.props.handleExit}
        >
          Exit
        </button> */}
        <TestResult id={this.props.problemId} />
      </div>
    )
  }
}

export default Instruction
