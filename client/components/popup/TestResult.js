import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class TestResult extends Component {
  render() {
    console.log('fasdlfkjSPEC', this.props.spec)
    return (
      <div>
        <h1>Test Results</h1>
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
