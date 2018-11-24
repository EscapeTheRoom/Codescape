import React, {Component} from 'react'
import Instruction from '../popup/Instruction'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getItemSolved, guestGameWon} from '../../store/guest'
import {fetchAProblem} from '../../store/problem'

class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleWin = this.handleWin.bind(this)
  }

  async handleClick(e) {
    e.preventDefault()
    const id = e.target.id
    const {items} = this.props.guest
    await this.props.fetchAProblem(id)
    if (items[id] === 'true') {
      this.setState({
        problemId: id,
        hidden: 'notHidden'
      })
    }

    // this.props.history.push(`/problem/${e.target.id}`)
  }

  async handleWin(e) {
    e.preventDefault()
    let {isSolved} = this.props.guest
    console.log('geust??????????????', isSolved)
    if (isSolved[3] === 'true') {
      await this.props.guestGameWon()
      this.setState({winner: 'notHidden'})
    }
  }

  handleExit() {
    this.setState({
      hidden: 'hidden'
    })
  }

  render() {
    const {problem} = this.props.problem
    let {isSolved} = this.props.guest
    console.log('geust???', isSolved[3])
    return (
      <div>
        <div>
          <img
            id={1}
            src="https://www.freeiconspng.com/uploads/beds-bedroom-icon-25.png"
            onClick={this.handleClick}
          />
          <img
            id={2}
            src="https://image.ibb.co/cGAHpq/alarm-clock.png"
            onClick={this.handleClick}
          />
          <img
            id={3}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCsguIkFdirKBtM-xBxv2lGtj09ZswAosa5T9NYFKqjeRTKPZ8zQ"
            onClick={this.handleClick}
          />
          <img
            id={4}
            src="http://www.217onmain.com/wp-content/uploads/2015/10/Screen-Shot-2015-10-06-at-4.22.16-PM-e1444763709261-747x498.png"
            onClick={this.handleWin}
          />
          <img
            className={this.state.winner}
            src="http://943thepoint.com/files/2013/09/my-little-resume.png?w=980&q=75"
          />
          <Instruction
            problemId={this.state.problemId}
            hidden={this.state.hidden}
            handleExit={this.handleExit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest,
  problem: state.problemsReducer
})

const mapDispatchToProps = dispatch => ({
  getItemSolved: problemId => dispatch(getItemSolved(problemId)),
  fetchAProblem: problemId => dispatch(fetchAProblem(problemId)),
  guestGameWon: () => dispatch(guestGameWon())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Level1))
