import React, {Component} from 'react'
import {connect} from 'react-redux'
import {sendInput, clearSpec} from '../../store/problem'

// Import Brace and the AceEditor Component
import AceEditor from 'react-ace'

// Import a Mode (language)
import 'brace/mode/javascript'

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/twilight'

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

    this.setState({
      code: value,
      id
    })
  }

  async handleSubmit(e) {
    e.preventDefault()

    await this.props.sendInput(this.state)
    const {spec} = this.props.problemState
    if (!spec.includes('failing')) {
      await this.props.clearSpec()
    }
  }

  async handleClick(e) {
    e.preventDefault()
    const {id} = this.props.problem

    this.setState({
      code: '',
      id
    })

    await this.props.clearSpec()
    await this.props.handleExit()
  }

  render() {
    const {functionSetup} = this.props.problem

    return (
      <div className="editor">
        <AceEditor
          mode="javascript"
          theme="twilight"
          name="code"
          height={'20vw'}
          width={'28vw'}
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={'1vw'}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code || functionSetup}
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

const mapStateToProps = state => ({
  problemState: state.problemsReducer
})

const mapDispatchToProps = dispatch => ({
  sendInput: input => dispatch(sendInput(input)),
  clearSpec: () => dispatch(clearSpec())
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)
