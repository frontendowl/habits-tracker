import React from "react";
import logo from "./imgs/owl.svg";
import "./App.scss";

import Controller from "./Controller.js";
import Tracker from "./Tracker.js";

const MIN_HABITS = 2,
  MAX_HABITS = 11,
  MIN_DAYS = 5,
  MAX_DAYS = 14;

class Header extends React.Component {
  render() {
    return (
      <header className="header no-print">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Customizable habit tracker</h1>
      </header>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 7,
      habits: Array(6).fill("")
    };
    // this.handleLinesChange = this.handleLinesChange.bind(this);
    // this.handleDaysChange = this.handleDaysChange.bind(this);
    // this.handleHabitRemove = this.handleHabitRemove.bind(this);
    // this.handleLineTextChange = this.handleLineTextChange.bind(this);
  }

  handleLinesChange = n => {
    const newHabits = [...this.state.habits];
    if (newHabits.length > n) {
      newHabits.length = n;
    } else {
      for (let i = newHabits.length; i < n; i++) {
        newHabits[i] = "";
      }
    }
    this.setState({ habits: newHabits });
  };

  handleDaysChange = n => {
    this.setState({ days: n });
  };

  handleHabitRemove = i => {
    const newHabits = [...this.state.habits];
    newHabits.splice(i, 1);
    if (newHabits.length < MIN_HABITS) {
      for (let i = newHabits.length; i < MIN_HABITS; i++) {
        newHabits[i] = "";
      }
    }
    this.setState({ habits: newHabits });
  };
  handleLineTextChange = (i, text) => {
    const newHabits = [...this.state.habits];
    newHabits[i] = text;
    this.setState({ habits: newHabits });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div id="settings" className="no-print">
          <Controller
            id="lines-controller"
            onValueChange={this.handleLinesChange}
            min={MIN_HABITS}
            max={MAX_HABITS}
            value={this.state.habits.length}
            lblTextBefore="I want to track"
            lblTextAfter="habits"
          />
          <Controller
            id="days-controller"
            onValueChange={this.handleDaysChange}
            min={MIN_DAYS}
            max={MAX_DAYS}
            value={this.state.days}
            lblTextBefore="for"
            lblTextAfter="days."
          />
        </div>
        <Tracker
          days={this.state.days}
          habits={this.state.habits}
          removeHabit={this.handleHabitRemove}
          onLineTextChange={this.handleLineTextChange}
        />
      </div>
    );
  }
}

export default App;
