import React, {Component} from 'react'
import Problem from './Problem'
import TestRes2 from './TestResult'
import {RenderLoop} from 'brace'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItemSolved2} from '../../store/level2guest.js'
import {clearSpec} from '../../store/problem'

class Instruction extends Component {
  constructor(props) {
    super(props) // props will be passed down including id for problem
  }

  render() {
    const {isSolved2} = this.props.guest
    const {items2} = this.props.guest

    if (isSolved2[this.props.problemId] === 'true') {
      if (this.props.problemId < 7) {
        //this.props.clearSpec()
        //if (this.props.user.isSolved[this.props.problemId] === 'true') {
        return (
          <div className={this.props.solved}>
            <button
              className="button"
              type="button"
              onClick={this.props.handleClose}
            >
              Close
            </button>
            <p>Problem solved!</p>
          </div>
        )
      }
    }

    if (items2[this.props.problemId] === 'false') {
      return (
        <div className={this.props.solved}>
          <button
            className="button"
            type="button"
            onClick={this.props.handleClose}
          >
            Close
          </button>
          <p>Clue locked, or this is not a clue!</p>
        </div>
      )
    }

    return (
      <div className={this.props.hidden}>
        <Problem id={this.props.problemId} handleExit={this.props.handleExit} />
        <TestRes2 id={this.props.problemId} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  spec: state.problemsReducer.spec,
  user: state.user,
  guest: state.level2guest
})
const mapDispatchToProps = dispatch => ({
  clearSpec: () => dispatch(clearSpec())
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Instruction)
)
