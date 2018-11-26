import React, {Component} from 'react'
import {connect} from 'react-redux'

class Level2backpack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      room: "level2"
    }
    //pass down the room name in props
    // pass down the items state in props
  }

  render() {
    const {items} = this.props.guest

    return (
      <div className="backpack2">
        {Object.keys(items)
          .slice(1)
          .map(
            (key, idx) =>
              items[+key] === 'true' ? (
                <img
                  className="backpackImg"
                  id={key}
                  key={idx}
                  src={`img/level2_${key}.png`}
                />
              ) : (
                <img
                  className="backpackImg"
                  src="/img/carImg.png"
                />
              )
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest2
})

export default connect(mapStateToProps)(Level2backpack)
