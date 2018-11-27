import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Instruction from '../popup/Instruction'
import {connect} from 'react-redux'
import {getItemSolved, guestGameWon, resetState} from '../../store/guest.js'
import {fetchAProblem} from '../../store/problem'
import ImageMapper from 'react-image-mapper'
import Backpack from '../backpack'
const source = 'img/unicornRoomCapstoneIMG.png'
const MAP = {
  name: 'unicornMap',
  areas: [
    {name: 'poster', shape: 'rect', id: 2, coords: [1267, 1953, 1630, 1374]},
    {
      name: 'figurine',
      shape: 'poly',
      id: 1,
      coords: [
        4501,
        2232,
        4537,
        2242,
        4542,
        2182,
        4578,
        2182,
        4601,
        2205,
        4647,
        2187,
        4638,
        2105,
        4596,
        2032,
        4537,
        2032,
        4496,
        2086,
        4460,
        2100,
        4460,
        2169
      ]
    },
    {
      name: 'door',
      shape: 'poly',
      id: 4,
      coords: [
        3501,
        831,
        4368,
        826,
        4373,
        2187,
        4332,
        2210,
        4341,
        2794,
        3506,
        2785
      ]
    },
    {
      name: 'chest',
      shape: 'poly',
      id: 3,
      coords: [18, 2041, 388, 2018, 488, 2141, 488, 2269, 183, 2342, 0, 2310]
    },
    {
      name: 'lightSwitch',
      shape: 'poly',
      className: 'notclue',
      coords: [3282, 1762, 3369, 1771, 3359, 1895, 3282, 1913]
    },
    {
      name: 'lamp',
      shape: 'poly',
      className: 'notclue',
      coords: [
        1543,
        2315,
        1438,
        2351,
        1415,
        2283,
        1433,
        2228,
        1369,
        2223,
        1383,
        2068,
        1410,
        1990,
        1534,
        1990,
        1556,
        2077,
        1579,
        2173,
        1543,
        2232,
        1543,
        2283
      ]
    },
    {
      name: 'backpack',
      shape: 'poly',
      className: 'notclue',
      coords: [
        4761,
        3072,
        5012,
        3155,
        5053,
        3520,
        4930,
        3588,
        4674,
        3520,
        4651,
        3196
      ]
    },
    {
      name: 'rug',
      shape: 'poly',
      className: 'notclue',
      coords: [2971, 2963, 3688, 2945, 4049, 3520, 3017, 3552]
    },
    {
      name: 'bed',
      shape: 'poly',
      className: 'notclue',
      coords: [
        1157,
        2680,
        2599,
        2684,
        2777,
        2401,
        2791,
        2945,
        2618,
        3187,
        1148,
        3145
      ]
    }
  ]
}

class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden',
      width: window.innerWidth,
      height: window.innerHeight,
      solved: 'solved',
      notClue: 'hidden',
      storyLine: 'storyline'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleWin = this.handleWin.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  async handleClick(e) {
    // e.preventDefault()
    const id = e.id
    const {items} = this.props.guest
    const {isSolved} = this.props.guest
    await this.props.fetchAProblem(id)

    if (items[id] === 'true') {
      this.setState({
        problemId: id,
        hidden: 'notHidden'
      })
    }
    if (isSolved[id] === 'true') {
      this.setState({
        problemId: id,
        hidden: 'hidden',
        solved: 'solved'
      })
    }
    if (items[id] === 'false') {
      this.setState({
        problemId: id,
        hidden: 'hidden',
        solved: 'solved'
      })
    }
  }

  handleClose() {
    this.setState({
      solved: 'hidden',
      notClue: 'hidden',
      storyLine: 'hidden'
    })
  }

  async handleWin(e) {
    let {items} = this.props.guest
    let {isSolved} = this.props.guest
    let probId = e.id
    if (items[4] === 'false') {
      this.setState({
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
          problemId: probId,
          hidden: 'hidden',
          winner: 'notHidden'
        })
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
  }
  handleReset() {
    this.setState({
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden',
      solved: 'solved',
      notClue: 'hidden'
    })
    this.props.resetState()
  }

  render() {
    return (
      <div>
        <div className="storyline-container">
          <div className={this.state.storyLine}>
            <span>
              Oh no! You have a job interview today, but you can't find your
              resume. Find it to escape the room.
            </span>
            <li> start by clicking around to find your first challenge!</li>
            <button id="storybutton" type="button" onClick={this.handleClose}>
              Start
            </button>
          </div>
        </div>

        <div className="game">
          <Backpack room="level1" />
          <ImageMapper
            id="unicorn"
            fillColor="transparent"
            strokeColor="transparent"
            src={source}
            map={MAP}
            width={this.state.width * 0.6}
            height={this.state.width / 1.3 * 0.6}
            imgWidth={5167}
            onClick={area => {
              if (area.id < 4) {
                this.handleClick(area)
              } else if (area.id === 4) {
                this.handleWin(area)
              } else if (area.className === 'notclue') {
                this.handleNotClue(area)
              }
            }}
          />
          <img
            id="resume"
            className={this.state.winner}
            src="/img/myLittleResume.png"
            onClick={this.handleExit}
          />
          <div className={this.state.notClue}>
            <button className="button" type="button" onClick={this.handleClose}>
              Close
            </button>
            <p>Clue locked, or this is not a clue!</p>
          </div>
          <Instruction
            problemId={this.state.problemId}
            hidden={this.state.hidden}
            handleExit={this.handleExit}
            solved={this.state.solved}
            handleClose={this.handleClose}
          />

          <Link to="/medium" className="nextlevel">
            Next Level
          </Link>
        </div>
        <button
          type="button"
          className="buttonstart"
          id='resetButton'
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
  getItemSolved: problemId => dispatch(getItemSolved(problemId)),
  fetchAProblem: problemId => dispatch(fetchAProblem(problemId)),
  guestGameWon: () => dispatch(guestGameWon()),
  resetState: () => dispatch(resetState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Level1))
