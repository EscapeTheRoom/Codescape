import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Levels from './levels'
import {connect} from 'react-redux'
import {resetState} from '../../store/guest.js'

const source = 'img/unicornRoomCapstoneIMG.png'
const mapping = {
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
      className: 'notClue',
      coords: [3282, 1762, 3369, 1771, 3359, 1895, 3282, 1913]
    },
    {
      name: 'lamp',
      shape: 'poly',
      className: 'notClue',
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
      className: 'notClue',
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
      className: 'notClue',
      coords: [2971, 2963, 3688, 2945, 4049, 3520, 3017, 3552]
    },
    {
      name: 'bed',
      shape: 'poly',
      className: 'notClue',
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
let width = 0.6
let height = 1 / 1.3 * 0.6
class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      level: 1,
      name: 'unicorn',
      backpack: 'level1',
      map: mapping,
      source: source,
      wide: width,
      tall: height,
      imgWidth: 5167,
      winningImg: '/img/myLittleResume.png',
      storyLine: 'storyline',
      backpackBg: 'backpack',
      backpackImg: '/img/unicornBackPack.png',
      idwinning: 'resume'
    }
    this.handleStart = this.handleStart.bind(this)
  }

  handleStart() {
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
              Oh no! You have a job interview today, but you can't find your
              resume. Find it to escape the room.
            </span>
            <li> start by clicking around to find your first challenge!</li>
            <button id="storybutton" type="button" onClick={this.handleStart}>
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

export default withRouter(connect(null, mapDispatchToProps)(Level1))
