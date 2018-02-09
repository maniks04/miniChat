import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      userName : '',
      messages: [],
      input : ''
    }
    this.serverPost = this.serverPost.bind(this)
    this.appendMessage = this.appendMessage.bind(this)
    this.serverGet=this.serverGet.bind(this)
  }

  componentDidMount() {
    console.log('mounted')
    var userInput = window.prompt('TYPE USERNAME')
    this.setState({userName : userInput})
    this.serverGet()
  }

  serverGet () {
    var context = this
    axios.get('/chat/pat').then(function(res) {
      context.appendMessage(res.data.results)
      console.log(res)
    }).catch(function(err) {
      console.log('error')
    })
  }

  appendMessage(array) {
    this.setState({messages : array})
  }


  serverPost () {
    var context = this
    axios.post('/chat/pat',{
      message: context.state.input,
      user: this.state.userName
    }).then(function(res) {
      $('.input').val('')
      console.log('response:', res)
      context.appendMessage(res.data.results)
    }).catch(function(err) {
      console.log(err)
    })
  }

  

  render () {
  	return (<div>
              <div className="container">
              <input className="input" placeholder="type here" onChange={(e) => this.setState({input: e.target.value})} onKeyUp={(e) => {if (e.keyCode=='13'){this.serverPost()}}}>
              </input>
              <button className="button" onClick={(e) => this.serverPost()}>submit</button>
              </div>
              <div id="chat">
                {this.state.messages.map((message, i) => 
                  <div className="text" key={i}>{message.user}: {message.message}</div>
                )}
              </div>

            </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));