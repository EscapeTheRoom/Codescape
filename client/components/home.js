import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-responsive-carousel'

class Home extends Component {
  render() {
    return (
      <div className="carousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
          <div>
            <img src="unicornRoom.png" />
            <p>
              <Link to="/easy" className="buttonstart">
                Easy
              </Link>
            </p>
          </div>
          <div>
            <img src="garage.png" />
            <p>
              <Link to="/medium" className="buttonstart">
                Medium
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
      </div>
    )
  }
}

export default Home
