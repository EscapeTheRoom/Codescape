import React, {Component} from 'react'


class Level1 extends Component { 
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        console.log("event Target", e.target.id)
        this.props.history.push(`/problem/${e.target.id}`)
    }
    render(){
        return(
            <div onClick={this.handleClick} >
                <img  id={1} src="https://www.freeiconspng.com/uploads/beds-bedroom-icon-25.png"></img>
            </div>
        )
    }

}
export default Level1;