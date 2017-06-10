import React, { Component } from 'react'

export default class Message extends Component {

  constructor(props){
    super(props)

    this.state = {
      editing: false,
      newMessage:  "",
    }

    //this.handleNewLike = this.handleNewLike.bind(this, this.props.message.id)
    //this.handleDislike = this.handleDislike.bind(this, this.props.message.id)
    //this.deleteMessage = this.deleteMessage.bind(this, this.props.message.id)
    // this.isEditing = this.isEditing.bind(this, this.props.message.id)
    // this.handleNewEdit = this.handleNewEdit.bind(this)
    // this.saveNewEdit = this.saveNewEdit.bind(this)
  }

  handleNewLike = () => {
    this.props.onNewLike(this.props.id)
  }

  handleDislike = () => {
    this.props.onDislike(this.props.id)
  }

  deleteMessage = () => {
    this.props.onDelete(this.props.id)
  }

  isEditing = () => {
    if(!this.state.editing){
      this.setState({
        editing: true
      })
    } else if(this.state.editing){
      this.setState({
        editing: false
      })
    }
  }


  handleNewEdit = (event) => {
    this.setState({
      newMessage: event.target.value
    })
  }

  saveNewEdit = (event) => {
    if(event.charCode == 13){
      this.setState({
        newMessage: event.target.value,
        editing: false
      }, function(){
        this.props.onNewEdit(this.state.newMessage, this.props.id)
      })
    }
  }


  render(){

    const iconStyle = {
      paddingLeft: '5px',
      float: 'right'
    }

    if(!this.state.editing){
      return(
        <li>
          {this.props.message.text}
          <i onClick={this.isEditing} style={iconStyle} className="fa fa-pencil"></i>
          <i onClick={this.deleteMessage} className="fa fa-trash pull-right delete"></i>
          <i onClick= {this.handleDislike} className="fa fa-thumbs-down pull-right"></i>
          <i onClick={this.handleNewLike} className="fa fa-thumbs-up pull-right"></i>
          <div className="pull-right">{this.props.message.likes}</div>
        </li>
      )
    }
    return(
      <li>
          <textarea onChange={this.handleNewEdit} onKeyPress={this.saveNewEdit} type="text" id="message">
            {this.props.message.text}
          </textarea>
          <i onClick={this.isEditing} style={iconStyle} className="fa fa-pencil"></i>
          <i onClick={this.deleteMessage} className="fa fa-trash pull-right delete"></i>
          <i onClick= {this.handleDislike} className="fa fa-thumbs-down pull-right"></i>
          <i onClick={this.handleNewLike} className="fa fa-thumbs-up pull-right"></i>
          <div className="pull-right">{this.props.message.likes}</div>
      </li>
    )
  }
}
