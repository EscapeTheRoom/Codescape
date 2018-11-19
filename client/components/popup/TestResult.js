import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class TestResult extends Component {
    constructor(props){
        super(props)
        
    }
 
  render() {
    return (
      <div className="bottom-container">
        <h3>Test Specs</h3>
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
