import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'

class Home extends Component {
  render() {
    return (
      <Carousel showArrows={true} showThumbs={false}>
        <div>
          <img src="unicornRoom.png" />
          <p>
            <Link to="/easy" className="buttonstart">
              Start
            </Link>
          </p>
        </div>
        <div>
          <img src="unicornRoom.png" />
          <p>
            <Link to="/medium" className="buttonstart">
              Start
            </Link>
          </p>
        </div>
        {/* <div>
                    <img src="////" />
                    <p><Link to ='/easy' id='button'>Start</Link></p>
                </div>
                <div>
                    <img src="////" />
                    <p><Link to ='/easy' id='button'>Start</Link></p>
                </div> */}
      </Carousel>
    )
  }
}

export default Home
