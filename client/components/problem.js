import React, {Component} from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';

// Import a Mode (language)
import 'brace/mode/javascript';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';
import {fetchProblem} from '../store/problem'
import {connect} from 'react-redux'


class Problem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.props.fetchProblem()
    }

    onChange(newValue) {
        console.log('change', newValue);
    }

    render() {
        return (
            <div className='editor'>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    name="blah2"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={`${this.props.problem}`}
                    setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 1,
                }}/>
                        
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      problem: state.problem,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProblem: () => dispatch(fetchProblem())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Problem)
