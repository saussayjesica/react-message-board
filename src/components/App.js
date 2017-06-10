import React, { Component  } from 'react';
import _ from 'lodash'

import uuid from 'uuid';
import Nav from './Nav'
import PostMessage from './PostMessage'
import MessageBoard from './MessageBoard'
import Message from './Message'
import db from '../lib/database'

const Messages = db.ref('Messages')

export default class App extends Component {
  constructor(props) {
    super(props)

      this.state = {
        messages: []
      }
    this.handleNewMessage = this.handleNewMessage.bind(this)
    //this.handleNewLike = this.handleNewLike.bind(this)
    //this.handleDislike = this.handleDislike.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  // componentWillMount(){
  //   this.setState({messages: [
  //     {id: uuid.v4(), text: 'Hello 👋', likes: 2},
  //     {id: uuid.v4(), text: 'Why did the 🐓 cross the road', likes: 100}
  //   ]})
  // }

  componentDidMount(){
    Messages.on('value', snapshot => {
      this.setState({
        messages: snapshot.val()
      })
    })
  }

  handleNewMessage(text) {
    //const newMessage = {id: uuid.v4(), text: text, likes: 0}
    const newMessage = {text: text, likes: 0}

    Messages.push(newMessage)
  }

  handleNewLike = (id) => {
    Messages.child(id).child('likes')
    .transaction(currentLikes => currentLikes + 1)

    //VERSION 2 - state not firebase
    // const newMessages = _.cloneDeep(this.state.messages)
    //
    // newMessages[id].likes = newMessages[id].likes + 1
    // this.setState({
    //   messages: newMessages
    // })

    //VERSION 1 - state not firebase
    // let messages = this.state.messages
    // let message = messages.find(number => number.id === id)
    // message.likes = message.likes + 1
    // this.setState({
    //   messages: messages
    // })
  }

  handleDislike = (id) => {
    Messages.child(id).child('likes')
    .transaction(currentLikes => {
      if(currentLikes > 0){
        return currentLikes - 1
      }
    })
  }


  handleDelete(id){
    Messages.child(id).remove()

    // let messages = this.state.messages
    // let index = messages.findIndex(i => i.id === id)
    // messages.splice(index, 1)
    // this.setState({
    //   messages: messages
    // })
  }

  handleEdit(text, id){
    Messages.child(id).update({
      text: text
    })

    // let messages = this.state.messages
    // let message = messages.find(number => number.id === id)
    // message.text = text
    // this.setState ({
    //   messages: messages
    // })
  }

  sortedMessages(){
    const messages = _.map(this.state.messages, (message, id) => {
      return {
        id: id,
        message: message
      }

    })
    return _.orderBy(messages, message => message.message.likes, 'desc')
  }

  render() {
    return (
      <div>
        <Nav>
        Anon Message Board
        </Nav>
        <div className="container">
          <PostMessage onNewMessage={this.handleNewMessage} />
          <MessageBoard>
            {_.map(this.sortedMessages(), (container) => (
              <Message
                key={container.id}
                id={container.id}
                onNewEdit={this.handleEdit}
                onDelete={this.handleDelete}
                onDislike={this.handleDislike}
                onNewLike={this.handleNewLike}
                message={container.message}
              />
              )
            )}
          </MessageBoard>
        </div>
      </div>
    )
  }
}
