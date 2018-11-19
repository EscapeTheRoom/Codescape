import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


// Import Brace and the AceEditor Component
import brace from 'brace'
import AceEditor from 'react-ace'

// Import a Mode (language)
import 'brace/mode/javascript'

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/twilight'
import {sendInput} from '../../store/problem'

class Input extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      code: '',
      id: 0
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentDidMount(){
  //     this.setState({
  //         id: this.props.problem.id
  //     })
  // }
  onChange(value) {
    const {id} = this.props.problem

    this.setState({
      code: value,
      id
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    // POST request to Docker API
    // console.log('code', this.state.code, 'problemId', this.props.problem.id)
    this.props.sendInput(this.state)
    
             
  }

  render() {
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
        <button onClick={this.handleSubmit} type="submit">
          Run Code
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendInput: input => dispatch(sendInput(input)),
 
})

export default connect(null, mapDispatchToProps)(Input)
