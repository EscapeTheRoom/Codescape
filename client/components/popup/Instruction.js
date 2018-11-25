import React, {Component} from 'react'
import Problem from './Problem'
import TestResult from './TestResult'
import {RenderLoop} from 'brace'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItemSolved} from '../../store/guest'
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
            <button className="button" type="button" onClick={this.props.handleClose}>Close</button>
            <p>You already solved this problem!</p>
          </div>
        )
      }
    }

    if (items[this.props.problemId] === 'false') {
      return (
        <div className={this.props.solved}>
            <button className="button" type="button" onClick={this.props.handleClose}>Close</button>
            <p>You don't have enough items to unlock this problem just yet</p>
        </div>
      )
    }
    
    return (
      <div className={this.props.hidden}>
        <Problem id={this.props.problemId} handleExit={this.props.handleExit} />
        <TestResult id={this.props.problemId} />
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