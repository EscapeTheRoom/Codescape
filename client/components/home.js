import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'
import {connect} from 'react-redux'
import {resetState} from '../store/guest.js'

class Home extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.resetState()
  }

  render() {
    return (
      <div className="carousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
          <div>
            <img src="unicornRoom.png" />
            <p>
              <Link
                to="/easy"
                className="buttonstart"
                onClick={this.handleClick}
              >
                Easy
              </Link>
            </p>
          </div>
          <div>
            <img src="garage.png" />
            <p>
              <Link
                to="/medium"
                className="buttonstart"
                onClick={this.handleClick}
              >
                Medium
              </Link>
            </p>
          </div>
          <div>
            <img src="hard-level.gif" />
            <p>
              <a className="buttonstart"> Coming Soon </a>
            </p>
          </div>
        </Carousel>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch(resetState())
})

export default withRouter(connect(null, mapDispatchToProps)(Home))
//export default Home
