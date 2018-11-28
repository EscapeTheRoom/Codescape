import React, {Component} from 'react'
import Problem from './Problem'
import TestResult2 from './TestResult'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearSpec} from '../../store/problem'

class Instruction extends Component {
  constructor(props) {
    super(props) // props will be passed down including id for problem
  }

  render() {
    const {isSolved} = this.props.guest
    const {items} = this.props.guest

    if (isSolved[this.props.problemId] === 'true') {
      if (this.props.problemId < 4) {
        //this.props.clearSpec()
        //if (this.props.user.isSolved[this.props.problemId] === 'true') {
        return (
          <div className={this.props.solved}>
            <button
              id="closebutton2"
              className="button"
              type="button"
              onClick={this.props.handleClose}
            >
              Close
            </button>
            <li>Problem solved!</li>
          </div>
        )
      }
    }

    if (items[this.props.problemId] === 'false') {
      return (
        <div className={this.props.solved}>
          <button
            id="closebutton"
            className="button"
            type="button"
            onClick={this.props.handleClose}
          >
            Close
          </button>
          <li>Clue locked, or this is not a clue!</li>
        </div>
      )
    }

    return (
      <div className={this.props.hidden}>
        <Problem id={this.props.problemId} handleExit={this.props.handleExit} />
        <TestResult2 id={this.props.problemId} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  spec: state.problemsReducer.spec,
  user: state.user,
  guest: state.guest
})
const mapDispatchToProps = dispatch => ({
  clearSpec: () => dispatch(clearSpec())
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Instruction)
)
