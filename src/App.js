import React from "react";
import logo from "./owl.svg";
import "./App.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Customizable habit tracker</h1>
      </header>
    );
  }
}
class Day extends React.Component {
  render() {
    return <div className="day-box" />;
  }
}
class Line extends React.Component {
  render() {
    const days = Array(this.props.days)
      .fill(0)
      .map(e => <Day />);
    return (
      <div className="habit-line">
        <div className="habit-name"></div>
        {days}
      </div>
    );
  }
}
class Tracker extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      lines: 6,
      days: 7
    };
  }
  */
  render() {
    const lines = Array(this.props.lines)
      .fill(0)
      .map(e => <Line days={this.props.days} />);
    return (
      <div className="tracker">
        <div className="tracker-header">Habit Tracker</div>
        <div className="habits-area">{lines}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Tracker days={7} lines={5} />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hi!</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
    </header> */}
      </div>
    );
  }
}

export default App;
