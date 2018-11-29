import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Levels from './levels'
import {connect} from 'react-redux'
import {resetState} from '../../store/guest.js'

const source = '/level3Image.png'
const mapping = {
  name: 'appletree',
  areas: [
    {
      name: 'hay2',
      shape: 'poly',
      id: 1,
      coords: [
        976,
        2805,
        992,
        2656,
        854,
        2635,
        785,
        2550,
        727,
        2418,
        515,
        2397,
        398,
        2428,
        340,
        2561,
        223,
        2545,
        106,
        2619,
        106,
        2752,
        483,
        2800
      ]
    },
    {
      name: 'door',
      shape: 'poly',
      id: 2,
      coords: [3708, 2153, 4058, 2121, 4016, 1585, 3973, 1511, 3655, 1569]
    },
    {
      name: 'tree',
      shape: 'poly',
      id: 3,
      coords: [
        1899,
        1702,
        1777,
        1797,
        1310,
        1474,
        1093,
        769,
        1379,
        361,
        1782,
        419,
        1936,
        573,
        2339,
        435,
        2705,
        488,
        2827,
        970,
        2615,
        1559,
        2355,
        1808,
        2148,
        1713,
        2117,
        2073,
        2180,
        2481,
        2334,
        2646,
        2573,
        2688,
        2228,
        2741,
        1867,
        2741,
        1581,
        2752,
        1798,
        2603,
        1920,
        2137
      ]
    },
    {
      name: 'hay1',
      shape: 'poly',
      className: 'notClue',
      coords: [
        1491,
        2678,
        1581,
        2651,
        1528,
        2402,
        1448,
        2185,
        1363,
        2025,
        1225,
        1904,
        1061,
        1893,
        838,
        1914,
        706,
        1962,
        637,
        2105,
        610,
        2259,
        599,
        2328,
        759,
        2428,
        785,
        2540,
        1013,
        2651,
        1072,
        2720
      ]
    },
    {
      name: 'window1',
      shape: 'poly',
      className: 'notClue',
      coords: [4260, 843, 4536, 843, 4652, 392, 4663, 186, 4382, 159, 4260, 350]
    },
    {
      name: 'window3',
      shape: 'poly',
      className: 'notClue',
      coords: [5008, 822, 5236, 822, 5395, 297, 5151, 143, 4976, 440]
    },
    {
      name: 'tile',
      shape: 'poly',
      className: 'notClue',
      coords: [
        3464,
        2519,
        3697,
        2492,
        3719,
        2588,
        4117,
        2598,
        4074,
        2450,
        4127,
        2280,
        4053,
        2227,
        3862,
        2275,
        3597,
        2375
      ]
    },
    {
      name: 'pony',
      shape: 'poly',
      id: 4,
      coords: [
        5299,
        3118,
        5337,
        2990,
        5284,
        2847,
        5284,
        2720,
        5432,
        2683,
        5421,
        2932,
        5464,
        2996,
        5533,
        3075,
        5597,
        3017,
        5618,
        2847,
        5559,
        2577,
        5310,
        2593,
        5188,
        2667,
        5108,
        2588,
        5114,
        2216,
        4907,
        2195,
        4785,
        2354,
        4918,
        2646,
        4992,
        2853,
        4986,
        3091,
        5114,
        3118
      ]
    }
  ]
}
let width = 0.6
let height = 1 / 1.59 * 0.6
class Level3 extends Component {
  constructor() {
    super()
    this.state = {
      level: 3,
      name: 'appletree',
      backpack: 'level3',
      map: mapping,
      source: source,
      wide: width,
      tall: height,
      imgWidth: 6005,
      winningImg: '/img/hard-level.gif',
      storyLine: 'storyline',
      backpackBg: 'backpack2',
      backpackImg: '/img/unicornBackPack.png',
      idwinning: 'pony',
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
              Despite the minor accident you made it to your interview! In order
              to get the job, you have to feed the pony with apples!
            </span>
            <li> start by clicking around to find your first challenge!</li>
            <li>Keep clicking on the objects to collect all three clues!</li>
            <li>Once you got the third clue feed the pony!</li>
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

export default withRouter(connect(null, mapDispatchToProps)(Level3))
