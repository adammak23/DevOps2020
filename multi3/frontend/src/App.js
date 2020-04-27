import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component
{
   constructor()
   {
     super()
     this.state = 
     {
       answer: '',
       info: ''
     }
     this.handleClick = this.handleClick.bind(this)
     this.handleClick2 = this.handleClick2.bind(this)
   }


  async handleClick2 ()
  {
    await axios.get(`/api/droptable`).then(response =>
      {
        console.log(response);
        this.setState({answer: response.data.text, info: response.data.info})
      })
  }

  async handleClick ()
  {
    //var range = document.getElementById("range").value;
    var num = document.getElementById("num").value;

    if(isNaN(num))
    {
      this.setState({answer: 'Not a Number!!!'})
      console.log('Not a Number entered');
      return;
    }
    else if(/\S/.test(num))
    {
      this.setState({answer: 'Calculating...'})
      this.setState({info: ''})
      await axios.get(`/api/islucky/${num}`).then(response =>
        {
          console.log(response);
          this.setState({answer: response.data.text, info: response.data.info})
        })
    }
    else
    {
      this.setState({answer: 'Nothing entered'})
      console.log('Nothing entered');
      return;
    }
  } 


render() {

  //const handleClick = async () => 
  //{
    //const Response = await axios.get('/api/');
    //console.log(Response);
  //};
  // wtedy w button: <button onClick={handleClick}>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" id="num" placeholder="Którą liczbę znaleźć..."></input>
        <div>
          <button onClick={this.handleClick}> Send Request </button>
          <p>{this.state.answer}</p>
          <p>{this.state.info}</p>
          <button onClick={this.handleClick2}> Clear Cache </button>
        </div>
      </header>
    </div>
  );
}
}

export default App;
