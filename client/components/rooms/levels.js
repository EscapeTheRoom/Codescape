import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Instruction from '../popup/Instruction'
import {connect} from 'react-redux'
import {guestGameWon, resetState} from '../../store/guest.js'
import {fetchAProblem} from '../../store/problem'
import ImageMapper from 'react-image-mapper'
import Backpack from '../backpack'

class Levels extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemState: 1,
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden',
      width: window.innerWidth,
      height: window.innerHeight,
      solved: 'solved',
      notClue: 'hidden'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleClosed = this.handleClosed.bind(this)
    this.handleWin = this.handleWin.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  async handleClick(e) {
    let {level} = this.props
    const itemId = e.id
    const id = itemId + (level * 3 - 3)
    const {items} = this.props.guest
    const {isSolved} = this.props.guest
    await this.props.fetchAProblem(id)

    if (items[itemId] === 'true') {
      this.setState({
        itemState: itemId,
        problemId: id,
        hidden: 'notHidden'
      })
    }
    if (isSolved[itemId] === 'true') {
      this.setState({
        itemState: itemId,
        problemId: id,
        hidden: 'hidden',
        solved: 'solved'
      })
      this.anError.play()
    }
    if (items[itemId] === 'false') {
      this.setState({
        itemState: itemId,
        problemId: id,
        hidden: 'hidden',
        solved: 'solved'
      })
      this.anError.play()
    }
  }

  handleClosed() {
    this.setState({
      solved: 'hidden',
      notClue: 'hidden',
      hidden: 'hidden'
    })
  }

  async handleWin(e) {
    let {items, isSolved} = this.props.guest
    let {level} = this.props
    const itemId = e.id
    const probId = itemId + (level * 3 - 3)

    if (items[4] === 'false') {
      this.setState({
        itemState: itemId,
        problemId: probId,
        hidden: 'hidden',
        solved: 'solved',
        winner: 'hidden'
      })
    }
    if (isSolved[3] === 'true') {
      await this.props.guestGameWon()
      if (this.props.guest.isWon) {
        this.setState({
          itemState: itemId,
          problemId: probId,
          hidden: 'hidden',
          winner: 'notHidden'
        })
        this.yay.play()
        this.props.resetState()
      }
    }
  }

  handleExit() {
    this.setState({
      hidden: 'hidden',
      solved: 'solved',
      winner: 'hidden'
    })
  }

  handleNotClue() {
    this.setState({
      notClue: 'solved'
    })
    this.anError.play()
  }

  handleReset() {
    this.setState({
      itemState: 1,
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden',
      solved: 'solved',
      notClue: 'hidden'
    })
    this.props.resetState()
  }

  render() {
    const {
      name,
      map,
      source,
      wide,
      tall,
      imgWidth,
      backpack,
      winningImg,
      backpackBg,
      backpackImg,
      idwinning
    } = this.props

    return (
      <div>
        <div className="game">
          <audio
            ref={anError => {
              this.anError = anError
            }}
          >
            <source src="/ErrorSound.mp3" type="audio/mpeg" />
          </audio>
          <audio
            ref={yay => {
              this.yay = yay
            }}
          >
            <source src="/YaySound.mp3" type="audio/mpeg" />
          </audio>
          <Backpack
            room={backpack}
            background={backpackBg}
            image={backpackImg}
          />
          <ImageMapper
            id={name}
            fillColor="transparent"
            strokeColor="transparent"
            src={source}
            map={map}
            width={this.state.width * wide}
            height={this.state.width * tall}
            imgWidth={imgWidth}
            onClick={area => {
              if (area.id < 4) {
                this.handleClick(area)
              } else if (area.id === 4) {
                this.handleWin(area)
              } else if (area.className === 'notClue') {
                this.handleNotClue(area)
              }
            }}
          />
          <img
            id={idwinning}
            className={this.state.winner}
            src={winningImg}
            onClick={this.handleExit}
          />
          <div className={this.state.notClue}>
            <button
              id="closebutton"
              className="button"
              type="button"
              onClick={this.handleClosed}
            >
              Close
            </button>
            <li>Clue locked, or this is not a clue!</li>
          </div>
          <Instruction
            problemId={this.state.problemId}
            itemState={this.state.itemState}
            hidden={this.state.hidden}
            handleExit={this.handleExit}
            solved={this.state.solved}
            handleClosed={this.handleClosed}
          />

          <Link
            to={this.props.nextLevel}
            className="nextlevel"
            onClick={this.handleReset}
          >
            Next Level
          </Link>
        </div>
        <button
          type="button"
          className="buttonstart"
          id="resetButton"
          onClick={this.handleReset}
        >
          Reset
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest,
  problem: state.problemsReducer
})

const mapDispatchToProps = dispatch => ({
  fetchAProblem: problemId => dispatch(fetchAProblem(problemId)),
  guestGameWon: () => dispatch(guestGameWon()),
  resetState: () => dispatch(resetState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Levels))
