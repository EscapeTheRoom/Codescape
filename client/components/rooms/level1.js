import React, {Component} from 'react'
import Instruction from '../popup/Instruction'

class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      problemId: 0,
      hidden: 'hidden'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleExit = this.handleExit.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    this.setState({
      problemId: e.target.id,
      hidden: 'notHidden'
    })

    // this.props.history.push(`/problem/${e.target.id}`)
  }

  handleExit() {
    this.setState({
      hidden: 'hidden'
    })
  }

  render() {
    return (
      <div>
        <div>
          <img
            id={1}
            src="https://www.freeiconspng.com/uploads/beds-bedroom-icon-25.png"
            onClick={this.handleClick}
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
export default Level1
