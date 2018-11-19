import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendInput} from '../../store/problem'

class TestResult extends Component {
  render() {
    return <h1>Test Results</h1>
  }
}

const mapStateToProps = state => ({
  spec: state.problemsReducer.spec
})

const mapDispatchToProps = dispatch => ({
  sendInput: () => dispatch(sendInput())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestResult)
)
