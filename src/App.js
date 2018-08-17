import React from 'react';
import Counter from './playground/counter-example-lifecycle';

class IndecisionApp extends React.Component {
  state = {
    options: ['One', 'Two', 'Four'],
  }

  deleteOptions = () => {
    this.setState(() => ({ options: [] }))
  }

  deleteOption = (option) => {
    this.setState((prevState) => ({ 
      options: prevState.options.filter((opt) => {
        return option !== opt;
      })
    }))
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  }

  addOption = (option) => {
    // if is an empty input
    if(!option) {
      return 'Enter valid value!'
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This item already exists!'
    }

    this.setState((prevState) => ({options: prevState.options.concat(option)}));
  } 

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
    console.log('Component did Update');
  }

  componentWillUnmount() {
    console.log('Component will Unmount');
  }

  render() {
    const title = "Indecision Aplication";
    const subtitle = "Put your life in the hands of a computer!";
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick = {this.handlePick}
          />
        <Options 
          options={this.state.options} 
          deleteOptions = {this.deleteOptions}
          deleteOption = {this.deleteOption}
          error={this.state.error} />
        <AddOption 
          addOption = {this.addOption}
         />
        <Counter />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button 
          disabled={!this.props.hasOptions} 
          onClick={this.props.handlePick}>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  
  render() {
    return <div>
      <button onClick={this.props.deleteOptions}>Remove All</button>

        {this.props.options.map(option => (
          <Option 
            key={option} 
            option={option}
            deleteOption={this.props.deleteOption} />
        ))}
      </div>;
  }
}

class Option extends React.Component {
  
  render() {
    return (
      <div>
        <p>{this.props.option}</p>
        <button 
          onClick={() => this.props.deleteOption(this.props.option)}>
          Delete Item</button>
      </div>
    );
  }
}

class AddOption extends React.Component {
  state = {
    error: ''
  }

  onFormSubmit  = (event) => {
    event.preventDefault();

    const option = event.target.elements.option.value.trim();
    const error = this.props.addOption(option);
    this.setState(() => ({error}));

    if(!error) {
      event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

export default IndecisionApp;