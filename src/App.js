import React from "react";
import logo from "./owl.svg";
import headerImg from "./header.svg";
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
class Day extends React.PureComponent {
  render() {
    return <div className="day-box" />;
  }
}
class Line extends React.PureComponent {
  render() {
    const days = Array(this.props.days)
      .fill(0)
      .map((e, i) => <Day key={`day${i}`} />);
    return (
      <div className="habit-line">
        <div className="habit-name" contentEditable={true}></div>
        {days}
      </div>
    );
  }
}
class Tracker extends React.Component {
  render() {
    const lines = Array(this.props.lines)
      .fill(0)
      .map((e, i) => <Line days={this.props.days} key={`habit${i}`} />);
    return (
      <div className="tracker">
        <img src={headerImg} className="tracker-header" alt="tracker header" />
        <div className="tracker-body">{lines}</div>
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defValue
    };
    this.handleChange = this.handleChange.bind(this);
  }

  isValid(rawValue) {
    const val = Number(rawValue);
    return val >= this.props.min && val <= this.props.max;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
    if (this.isValid(value)) {
      this.props.onValueChange(Number(value));
    }
  }
  render() {
    const isError = !this.isValid(this.state.value);
    return (
      <label htmlFor={this.props.id} className="lbl">
        {this.props.lblTextBefore}
        <input
          className={isError ? "error input" : "input"}
          id={this.props.id}
          type="number"
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange}
        />
        {this.props.lblTextAfter}
      </label>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: 6,
      days: 7
    };
    this.handleLinesChange = this.handleLinesChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
  }
  handleLinesChange(n) {
    this.setState({ lines: n });
  }
  handleDaysChange(n) {
    this.setState({ days: n });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div id="settings">
          <Controller
            id="lines-controller"
            onValueChange={this.handleLinesChange}
            min={2}
            max={11}
            defValue={this.state.lines}
            lblTextBefore="I want to track"
            lblTextAfter="habits"
          />
          <Controller
            id="days-controller"
            onValueChange={this.handleDaysChange}
            min={5}
            max={14}
            defValue={this.state.days}
            lblTextBefore="for"
            lblTextAfter="days."
          />
        </div>
        <Tracker days={this.state.days} lines={this.state.lines} />
      </div>
    );
  }
}

export default App;
