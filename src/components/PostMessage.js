import React, {Component} from 'react'

export default class PostMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newMessage: ''
    }

    this.createNewMessage = this.createNewMessage.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  createNewMessage(){
    this.props.onNewMessage(this.state.newMessage)
  }

  handleMessageChange(event){
    this.setState({
      newMessage: event.target.value
    })
  }


  render(){
    return(
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-heading">Post a message</div>
            <div className="panel-body">
              <div className="form-group">
                <label>Message:</label>
                <textarea onChange={this.handleMessageChange} id="message" type="text" className="form-control">
                  {this.state.newMessage}
                </textarea>
              </div>
            <button onClick={this.createNewMessage} id="submit" className="btn btn-default">Post to board</button>
          </div>
        </div>
      </div>
    )
  }
}
