import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0
  }
  onAdd = () => {
    this.setState((prevState) => ({counter: prevState.counter + 1}))
  }
  onSubstract = () => {
    this.setState((prevState) => ({counter: prevState.counter - 1}))
  }
  onReset = () => {
    this.setState((prevState) => ({counter: 0}))
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.counter} </h1>
        <button onClick={this.onAdd}>+1</button>
        <button onClick={this.onSubstract}>-1</button>
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

export default Counter;