import React, {Component} from 'react'
import {connect} from 'react-redux'

class Backpack extends Component {
    constructor(props){
        super(props) 
        this.state= {
            items: {},
            room: this.props.room
        }
        //pass down the room name in props
        // pass down the items state in props
    }
    render(){
        console.log("backPack")
        const {items} = this.props.guest
       
        return (
            <div className="backpack">
            {
                Object.keys(items)
                .slice(1)
                .map((key)=> (
                    (items[+key]==="true") ?<img className="backpackImg"id={key} src={`img/${this.state.room}_${key}.png`}/> :<img className="backpackImg" src="https://vignette.wikia.nocookie.net/badcreepypasta/images/6/6a/Back-x-clip-art.png/revision/latest?cb=20170409172915"/>
                ))
            //     Object.keys(items).map( (key, idx) => (
            //         (items[idx+2]==="true")? <img className="backpackImg"id={key} src={`img/${this.state.room}_${idx+1}.png`}/> :<img className="backpackImg" src="https://vignette.wikia.nocookie.net/badcreepypasta/images/6/6a/Back-x-clip-art.png/revision/latest?cb=20170409172915"/>
            // ))
            }
            </div>
        )
        
    }
}

const mapStateToProps = state => ({
    guest: state.guest,
  })

export default connect(mapStateToProps)(Backpack)