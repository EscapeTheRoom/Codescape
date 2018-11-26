import React, {Component} from 'react'
import Instruction2 from '../popup/Instruction2'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getItemSolved2, guestGameWon2} from '../../store/guest2'
import {fetchAProblem} from '../../store/problem'
import ImageMapper from 'react-image-mapper'
import Level2backpack from '../level2backpack'
const source = 'img/garage_capstone.png'
const MAP = {
  name:'garage',
  areas: [
    {name: "toolbox", shape: "poly", id:5, coords:[5558,1516,5442,1511,5410,1766,5553,1787]},
    {name: "broom", shape: "poly", id:4, coords:[1697,1554,1565,1850,1501,1909,1618,1935,1628,1787]},
    {name: "key", shape: "poly", id:6, coords:[743,2762,636,2805,743,2895,992,2847,902,2789]},
    {name: "fireExtinguisher", shape: "poly", className:"notClue", coords:[202,1564,90,1612,80,1850,143,1925,202,1904,191,1702]},
    {name: "fireextinguisher2", shape: "poly", className:"notClue", coords:[350,1596,324,1660,334,1797,392,1797,387,1702]},
    {name: "exit", shape: "poly", className:"notClue", coords:[4689,1331,4646,1384,4694,1426,4906,1410,4895,1336]},
    {name: "cars", shape: "poly", className:"notClue", coords:[4004,1856,3676,1904,3479,1872,3050,1850,2933,1898,2774,1914,2376,1925,1989,1972,1904,2036,2084,2078,2270,2174,2541,2280,2822,2333,3182,2381,3527,2370,3665,2253,3851,2216,4095,2216,4174,2137,4291,2147,4429,2105,4312,2015]},
    {name: "yellowCar", shape: "poly", id:7, coords:[180,2232,780,2036,1650,2052,2000,2190,2259,2296,2636,2413,2790,2603,2816,2768,2148,2821,1400,2863,780,2736,313,2667,143,2609]},
    
  ]
}
class Level2 extends Component {
  constructor() {
    super()
    this.state = {
      problemId: 0,
      hidden: 'hidden',
      winner: 'hidden',
      width: window.innerWidth,
      height: window.innerHeight,
      solved: 'solved',
      notClue:'hidden'
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleWin = this.handleWin.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
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
    console.log(id)
    const {items} = this.props.guest
    const {isSolved} = this.props.guest
    await this.props.fetchAProblem(id)

    if (items[id] === 'true') {
      console.log('yes!')
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
      solved: 'closeSolved',
      notClue: "hidden"
    })
  }

  async handleWin(e) {
    let {items} = this.props.guest
    let {isSolved} = this.props.guest
    let probId = e.id
    console.log('geust??????????????', isSolved)
    if (items[7] === 'false') {
      this.setState({
        problemId: probId,
        hidden: 'hidden',
        solved: 'solved',
        winner: 'hidden'
      })
    }
    if (isSolved[6] === 'true') {
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
  handleNotClue(){
    this.setState({
      notClue:"solved"
    })
  }

  render() {
    return (
      <div>
        <div className="game">
          <Level2backpack room="level1" />
          <ImageMapper
            id="garage"
            fillColor="transparent"
            strokeColor="transparent"
            src={source}
            map={MAP}
            width={this.state.width * 0.6}
            height={this.state.width / 1.59 * 0.6}
            imgWidth={6004}
            onClick={area => {
              if (area.id < 7) {
                this.handleClick(area)
              } else if (area.id === 7) {
                this.handleWin(area)
              } else if (area.className==="notclue"){
                this.handleNotClue(area)
              }
            }}
          />
          <img
            className={this.state.winner}
            src="/img/aston.gif"
            onClick={this.handleExit}
          />
             <div className={this.state.notClue}>
            <button className="button" type="button" onClick={this.handleClose}>Close</button>
            <p>Clue locked, or this is not a clue!</p>
          </div>
          <Instruction2
            problemId={this.state.problemId}
            hidden={this.state.hidden}
            handleExit={this.handleExit}
            solved={this.state.solved}
            handleClose={this.handleClose}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest2,
  problem: state.problemsReducer
})

const mapDispatchToProps = dispatch => ({
  getItemSolved: problemId => dispatch(getItemSolved2(problemId)),
  fetchAProblem: problemId => dispatch(fetchAProblem(problemId)),
  guestGameWon: () => dispatch(guestGameWon2())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Level2))
