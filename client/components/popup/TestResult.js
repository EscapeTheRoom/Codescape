import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class TestResult extends Component {
  render() {
    return (
      <div className="bottom-container">
        <h3>Test Specs</h3>
        <div>
          {this.props.spec
            .split('\n')
            .map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  spec: state.problemsReducer.spec
})

export default withRouter(connect(mapStateToProps)(TestResult))
