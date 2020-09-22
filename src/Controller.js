import React from "react";

class Controller extends React.PureComponent {
  constructor(props) {
    super(props);
    let val = this.props.value;
    this.state = {
      draftValue: val,
      prevPropsValue: val
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.value !== prevState.prevPropsValue
      ? { draftValue: nextProps.value, prevPropsValue: nextProps.value }
      : null;
  }

  isValid = rawValue => {
    const val = Number(rawValue);
    return val >= this.props.min && val <= this.props.max;
  };
  onValueChange = value => {
    if (this.isValid(value)) {
      this.props.onValueChange(Number(value));
    }
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({ draftValue: value });
    this.onValueChange(value);
  };
  handleBlur = e => {
    const value = e.target.value;
    this.onValueChange(value);
    this.setState({ draftValue: this.props.value });
  };

  render() {
    const isError = !this.isValid(this.state.draftValue);
    /* text is handled via labels for accessibility */
    return (
      <label htmlFor={this.props.id} className="lbl">
        {this.props.lblTextBefore + " "}
        <input
          className={isError ? "error input" : "input"}
          id={this.props.id}
          type="number"
          value={this.state.draftValue}
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {" " + this.props.lblTextAfter + " "}
      </label>
    );
  }
}

export default Controller;
