import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Levels from './levels'
import {connect} from 'react-redux'
import {resetState} from '../../store/guest.js'

const source = 'img/garage_capstone.png'
const mapping = {
  name: 'garage',
  areas: [
    {
      name: 'toolbox',
      shape: 'poly',
      id: 2,
      coords: [5558, 1516, 5442, 1511, 5410, 1766, 5553, 1787]
    },
    {
      name: 'broom',
      shape: 'poly',
      id: 1,
      coords: [1697, 1554, 1565, 1850, 1501, 1909, 1618, 1935, 1628, 1787]
    },
    {
      name: 'key',
      shape: 'poly',
      id: 3,
      coords: [743, 2762, 636, 2805, 743, 2895, 992, 2847, 902, 2789]
    },
    {
      name: 'fireExtinguisher',
      shape: 'poly',
      className: 'notClue',
      coords: [202, 1564, 90, 1612, 80, 1850, 143, 1925, 202, 1904, 191, 1702]
    },
    {
      name: 'fireextinguisher2',
      shape: 'poly',
      className: 'notClue',
      coords: [350, 1596, 324, 1660, 334, 1797, 392, 1797, 387, 1702]
    },
    {
      name: 'exit',
      shape: 'poly',
      className: 'notClue',
      coords: [4689, 1331, 4646, 1384, 4694, 1426, 4906, 1410, 4895, 1336]
    },
    {
      name: 'cars',
      shape: 'poly',
      className: 'notClue',
      coords: [
        4004,
        1856,
        3676,
        1904,
        3479,
        1872,
        3050,
        1850,
        2933,
        1898,
        2774,
        1914,
        2376,
        1925,
        1989,
        1972,
        1904,
        2036,
        2084,
        2078,
        2270,
        2174,
        2541,
        2280,
        2822,
        2333,
        3182,
        2381,
        3527,
        2370,
        3665,
        2253,
        3851,
        2216,
        4095,
        2216,
        4174,
        2137,
        4291,
        2147,
        4429,
        2105,
        4312,
        2015
      ]
    },
    {
      name: 'yellowCar',
      shape: 'poly',
      id: 4,
      coords: [
        180,
        2232,
        780,
        2036,
        1650,
        2052,
        2000,
        2190,
        2259,
        2296,
        2636,
        2413,
        2790,
        2603,
        2816,
        2768,
        2148,
        2821,
        1400,
        2863,
        780,
        2736,
        313,
        2667,
        143,
        2609
      ]
    }
  ]
}
let width = 0.6
let height = 1 / 1.59 * 0.6
class Level2 extends Component {
  constructor() {
    super()
    this.state = {
      level: 2,
      name: 'garage',
      backpack: 'level2',
      map: mapping,
      source: source,
      wide: width,
      tall: height,
      imgWidth: 6004,
      winningImg: '/img/aston.gif',
      storyLine: 'storyline',
      backpackBg: 'backpack2',
      backpackImg: '/img/carImg.png',
      idwinning: 'plain',
      nextLevel: '/easy'
    }
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose() {
    this.props.resetState()
    this.setState({
      storyLine: 'hidden'
    })
  }

  render() {
    return (
      <div>
        <div className="storyline-container">
          <div className={this.state.storyLine}>
            <span>
              Now you have your resume, your dad offers you a ride to take you
              to the interview, but he misplaced his key. Can you help him find
              it?
            </span>
            <li> start by clicking around to find your first challenge!</li>
            <button id="storybutton" type="button" onClick={this.handleClose}>
              Start
            </button>
          </div>
        </div>

        <Levels {...this.state} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch(resetState())
})

export default withRouter(connect(null, mapDispatchToProps)(Level2))
