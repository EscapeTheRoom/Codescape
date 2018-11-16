import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/javascript';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';
import { sendInput } from '../../store/problem';

class Input extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            code: ""
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange (value) {
        this.setState({
            code: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        // POST request to Docker API
        // console.log('code', this.state.code, 'problemId', this.props.problem.id)
        this.props.sendToDockerAPI(this.state.code, this.props.problem.id)
    }

    render() {
        console.log('code', this.state.code, 'problemId', this.props.problem.id)
        return (
            <div className='editor'>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
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
                    tabSize: 1,
                }}/>
                
                <button type="submit" onSubmit={this.handleSubmit}>Run Code</button>
            </div>
        );
    }
}

// const mapStateToProps = dispatch => ({
//     problem: 
// })

const mapDispatchToProps = dispatch => ({
    sendToDockerAPI: (input, spec) => dispatch(sendInput(input))
})

export default connect(null, mapDispatchToProps)(Input)