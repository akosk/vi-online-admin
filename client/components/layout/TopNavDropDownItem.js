import React, { Component } from 'react';

class TopNavDropDownItem extends Component {

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onSelect(this.props.item.id, e);
  }

  render() {
    return (
      <li>
        <a onClick={this.onClick}> {this.props.item.name}</a>
      </li>
    );
  }
}

export default TopNavDropDownItem;

