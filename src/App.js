import React from 'react';
class IndecisionApp extends React.Component {
  render() {
    const title = "Indecision Aplication";
    const subtitle = "Put your life in the hands of a computer!";
    const options = ['One', 'Two', 'Three']
    return (
      <div>
        <Header title={title} subtitle={subtitle}/>
        <Action />
        <Options options={options} />
        <AddOption />
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
        <button>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return <div>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>;
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.option}</p>
      </div>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <div>
        AddOption component here
      </div>
    );
  }
}

export default IndecisionApp;