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
import { sendInputWithSpec } from '../../store/problem';

class Input extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            code: {}
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

        
        this.props.sendToDocker(this.state.code, spec)
        
    }

    render() {
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

const mapDispatchToProps = dispatch => ({
    sendToDocker: (input, spec) => dispatch(sendInputWithSpec(input, spec))
})

export default connect(null, mapDispatchToProps)(Input)