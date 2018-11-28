import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {isSolved, gameWon, updateIsSolved} from '../../store/user'
import {guestIsSolved, guestGameWon} from '../../store/guest.js'

class TestResult extends Component {
  async componentDidUpdate(prevProps) {
    if (this.props.spec && !this.props.spec.includes('failing')) {
      await this.props.guestIsSolved(this.props.itemId)
    }
  }

  render() {
    return (
      <div className="bottom-container">
        <h3>Test Specs</h3>
        <div>
          {this.props.spec
            .split('\n')
            .map((line, idx) => (line !== '' ? <p key={idx}>{line}</p> : null))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spec: state.problemsReducer.spec
})
const mapDispatchToProps = dispatch => {
  return {
    isSolved: problemId => dispatch(isSolved(problemId)),
    gameWon: () => dispatch(gameWon()),
    updateIsSolved: isSolvedObj => dispatch(updateIsSolved(isSolvedObj)),
    guestIsSolved: problemId => dispatch(guestIsSolved(problemId)),
    guestGameWon: () => dispatch(guestGameWon())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestResult)
)
