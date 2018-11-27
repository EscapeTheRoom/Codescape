import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {isSolved, gameWon, updateIsSolved} from '../../store/user'
import {guestIsSolved2, guestGameWon2} from '../../store/level2guest.js'

class TestRes2 extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidUpdate(prevProps) {
    const {user} = this.props.user

    if (user.id && prevProps.spec !== this.props.spec) {
      if (this.props.spec && !this.props.spec.includes('failing')) {
        await this.props.isSolved(this.props.id)
        if (this.props.user.id) {
          this.props.updateIsSolved(this.props.user.isSolved)
          //send the updated isSolved to the store
          // which will update the db for the user
        }
      }
    } else if (this.props.spec && !this.props.spec.includes('failing')) {
      await this.props.guestIsSolved(this.props.id)

      //if not logged in
      // send new isSolved to sessionStorage

      // this.props.gameWon()
    }
  }

  render() {
    return (
      <div className="bottom-container">
        <h3>Test Specs</h3>
        <div>
          {this.props.spec
            .split('\n')
            .map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spec: state.problemsReducer.spec,
  user: state.user
})
const mapDispatchToProps = dispatch => {
  return {
    isSolved: problemId => dispatch(isSolved(problemId)),
    gameWon: () => dispatch(gameWon()),
    updateIsSolved: isSolvedObj => dispatch(updateIsSolved(isSolvedObj)),
    guestIsSolved: problemId => dispatch(guestIsSolved2(problemId)),
    guestGameWon: () => dispatch(guestGameWon2())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestRes2)
)
