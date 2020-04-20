import React, { Component } from 'react';
import Component1 from './functional/component1';
import Container1 from './containers/container1';
import Container2 from './containers/container2';

import './App.css';
import * as styles from './styles'

class App extends Component {
  render(){
    return (
      <div className="App">
        react!
        <div style={styles.styles}>
          Style
        </div>
        <Container1 nickname='dfffd' />
        <Component1 name = 'dddd' age={25}/>
        <Container2 />
      </div>
    );
  }
}

export default App;
