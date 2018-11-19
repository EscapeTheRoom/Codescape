import React, {Component} from 'react'
import Instruction from '../popup/Instruction'


class Level1 extends Component { 
    constructor(){
        super()
        this.state = {
            problemId: 1,
            hidden: 'hidden'
        }
        this.handleClick = this.handleClick.bind(this)
        
    }
    handleClick(e){
        console.log("event Target", e.currentTarget)
        this.setState({
            problemId: e.target.id,
            hidden: "notHidden"
        })


        // this.props.history.push(`/problem/${e.target.id}`)
    }
    render(){
        return(
            <div>
            <div onClick={this.handleClick} >
                <img  id={1} src="https://www.freeiconspng.com/uploads/beds-bedroom-icon-25.png"></img>
            <Instruction problemId={this.state.problemId} hidden={this.state.hidden} />    
            </div> 
            </div>                                                         
        )
    }

}
export default Level1;