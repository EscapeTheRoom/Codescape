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

    componentDidUpdate(prevProps){
        console.log("PREVPROPS",prevProps)
        if (prevProps.guest.items !== this.props.guest.items){

            this.setState({
                items: this.props.guest.items
            })
            

        }
    }

    render(){
        console.log(this.state)
        const {items} = this.props.guest
        console.log("items", items)
        console.log(Object.keys(items))
        return (
            <div className="backpack">
            {
                Object.keys(items).map( (key, idx) => (
                    
                    (items[idx+2]==="true")? <img className="backpackImg"id={key} src={`img/${this.state.room}_${idx+2}.png`}/> :<img className="backpackImg" src="https://vignette.wikia.nocookie.net/badcreepypasta/images/6/6a/Back-x-clip-art.png/revision/latest?cb=20170409172915"/>
            ))
            }
            </div>
        )
        
    }
}

const mapStateToProps = state => ({
    guest: state.guest,
  })

export default connect(mapStateToProps)(Backpack)