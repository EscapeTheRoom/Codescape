import React, {Component} from 'react'

export default class StoryLineLevel1 extends Component {
    constructor () {
        super()

        this.state = {
            storyline: 'storyline'
        }

        this.onClose = this.onClose.bind(this)
    }

    onClose () {
        this.setState({
            storyline: 'nostoryline'
        })
    }

    render () {
        return (
            <div className="storyline-container">
                <div className={this.state.storyline}>
                    <button className="storybutton" type="button" onClick={this.onClose}>X</button>
                    <p>You have to find the resume to escape the room</p>
                </div>
            </div>
        )
    }
}