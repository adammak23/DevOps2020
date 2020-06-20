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
      <body>
      <section>
      <h1>Czym są liczny szczęśliwe?</h1>
      <p>W teorii liczb szczęśliwa liczba jest liczbą naturalną w zestawie,
        która jest generowana przez pewne „sito”.
        To sito jest podobne do sita Eratostenesa, które generuje liczby pierwsze,
        ale eliminuje liczby na podstawie ich pozycji w pozostałym zbiorze,
        zamiast ich wartości (lub pozycji w początkowym zbiorze liczb naturalnych).
        Termin został wprowadzony w 1956 r. W pracy Gardinera, Łazarza, Metropolii i Ulama.
        Sugerują również nazywanie definiującego sita „sitem Józefa Flawiusza” [1]
        ze względu na jego podobieństwo do gry polegającej na odliczaniu w problemie Józefa Flawiusza.</p>
      <p>https://en.wikipedia.org/wiki/Lucky_number</p>
      </section>
      </body>
      <footer>
      <p><a href="https://github.com/adammak23/DevOps2020">Source Code</a>.</p>
      <p>© 2020 Adam Makiewicz</p>
      </footer>
    </div>
  );
}
}

export default App;
