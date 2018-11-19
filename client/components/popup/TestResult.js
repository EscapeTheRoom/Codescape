import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class TestResult extends Component {
    constructor(props){
        super(props)
        
    }
 
  render() {
    return (
      <div>
        <h1>Test Results</h1>
        <div>
          {this.props.spec
            .split('\n')
            .map((line, idx) => (
                <p key={idx}>{line}</p>
            ))}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  spec: state.problemsReducer.spec,
  isSolved: state.isSolved,

})


export default withRouter(connect(mapStateToProps)(TestResult))
