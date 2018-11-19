import React, {Component} from 'react'
import Problem from './Problem'
import TestResult from './TestResult'
import { RenderLoop } from 'brace';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class Instruction extends Component {
    constructor(props){
        super(props) // props will be passed down including id for problem

    }
    
    render(){
        return (
          <div className={this.props.hidden}>
            <Problem id={this.props.problemId} />
            <TestResult id={this.props.problemId}/>
          </div>
        )
    }
}
const mapStateToProps = state => ({
    spec: state.problemsReducer.spec,
    isSolved: state.isSolved,
  
  })
 

export default withRouter(connect(mapStateToProps)(Instruction))
