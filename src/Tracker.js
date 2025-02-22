import React from "react";
import headerImg from "./imgs/trackerheader.png";

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
    const trimmedHabit = this.props.habit.trim();
    return (
      <div className="habit-line">
        <button
          className={`remove-habit no-print${
            trimmedHabit === "" ? " hidden" : ""
          }`}
          onClick={this.props.removeHabit}
          title="remove habit"
        />
        <div
          onBlur={e => {
            this.props.onTextChange(e.currentTarget.textContent);
          }}
          className="habit-name"
          // className={`habit-name${trimmedHabit.length ? " no-border" : ""}`}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {this.props.habit}
        </div>
        {days}
      </div>
    );
  }
}
class Tracker extends React.PureComponent {
  render() {
    const lines = this.props.habits.map((e, i) => (
      <Line
        days={this.props.days}
        removeHabit={() => this.props.removeHabit(i)}
        key={`habit${i}`}
        habit={e}
        onTextChange={text => this.props.onLineTextChange(i, text)}
      />
    ));
    return (
      <div className="tracker">
        <img src={headerImg} className="tracker-header" alt="tracker header" />
        <div className="tracker-body">{lines}</div>
      </div>
    );
  }
}

export default Tracker;
