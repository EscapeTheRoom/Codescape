import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {clearCode, setCode} from '../../store/problem'

// Import Brace and the AceEditor Component
import brace from 'brace'
import AceEditor from 'react-ace'

// Import a Mode (language)
import 'brace/mode/javascript'

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/twilight'
import {sendInput, clearSpec} from '../../store/problem'

class Input extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: '',
      id: 0
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  onChange(value) {
    const {id} = this.props.problem
    //const {code} = this.props.problem.functionSetup

    this.setState({
      code: value,
      id
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.setCode(this.state)
    this.props.sendInput(this.state)
  }

  async handleClick(e) {
    e.preventDefault()
    const {id} = this.props.problem

    this.setState({
      code: '',
      id
    })
    
    await this.props.handleExit()
    await this.props.clearSpec()
    // await this.props.clearInput()
  }

  render() {
    const {functionSetup} = this.props.problem
    return (
      <div className="editor">
        <AceEditor
          mode="javascript"
          theme="twilight"
          name="code"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 1
          }}
        />
        <button className="button" type="submit" onClick={this.handleSubmit}>
          Run Code
        </button>
        <button className="button" type="submit" onClick={this.handleClick}>
          Exit
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendInput: input => dispatch(sendInput(input)),
  clearSpec: () => dispatch(clearSpec()),
  clearInput: (code) => dispatch(clearCode(code)),
  setCode: (code) => dispatch(setCode(code))
})

export default connect(null, mapDispatchToProps)(Input)
