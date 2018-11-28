import React, {Component} from 'react'
import {connect} from 'react-redux'

class Backpack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {}
    }
  }
  render() {
    const {items} = this.props.guest
    return (
      <div className={this.props.background}>
        {Object.keys(items)
          .slice(1)
          .map(
            (key, idx) =>
              items[+key] === 'true' ? (
                <img
                  className="backpackImg"
                  id={key}
                  key={idx}
                  src={`img/${this.props.room}_${key}.png`}
                />
              ) : (
                <img className="backpackImg" src={this.props.image} />
              )
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest
})

export default connect(mapStateToProps)(Backpack)
