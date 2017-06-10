import React, { Component } from 'react'

export default class MessageBoard extends Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="panel-group">
        <div className="panel panel-default">
          <div className="panel-heading">Message Board</div>
            <div className="panel-body">
              <ul className="message-board">
              {this.props.children}
              </ul>
            </div>
        </div>
      </div>
    )
  }
}
