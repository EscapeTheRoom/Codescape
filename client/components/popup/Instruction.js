import React, {Component} from 'react'
import Problem from './Problem'
import TestResult from './TestResult'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearSpec} from '../../store/problem'

class Instruction extends Component {
  render() {
    const {isSolved} = this.props.guest
    const {items} = this.props.guest
    const itemState = this.props.itemState

    if (isSolved[itemState] === 'true') {
      if (this.props.itemState < 4) {
        return (
          <div className={this.props.solved}>
            <button
              id="closebutton2"
              className="button"
              type="button"
              onClick={this.props.handleClosed}
            >
              Close
            </button>
            <li>Problem solved!</li>
          </div>
        )
      }
    }

    if (items[this.props.itemState] === 'false') {
      return (
        <div className={this.props.solved}>
          <li>Clue locked, or this is not a clue!</li>
          <li>Keep clicking on the objects to collect all three clues!</li>
          <li>Once you got the third clue find your escape!</li>

          <button
            id="closebutton"
            className="button"
            type="button"
            onClick={this.handleClosed}
          >
            Close
          </button>
        </div>
      )
    }

    return (
      <div className={this.props.hidden} id="editorContainer">
        <Problem
          id={this.props.problemId}
          handleExit={this.props.handleExit}
          itemId={this.props.itemState}
        />
        <TestResult id={this.props.problemId} itemId={this.props.itemState} />
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
