import React, { Component } from 'react';
import TopNavDropDownItem from './TopNavDropDownItem';
import classNames from 'classnames';

class TopNavDropDown extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const onSelect = this.props.onSelect;
    const dropDownClass = classNames({
      'dropdown': true,
      'open': this.state.open,
    });

    return (
      <li role="presentation" className={dropDownClass} onClick={this.onClick}>
        <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown"
           aria-expanded="false">
          <span>{this.props.selectedName}</span>
          <span className=" fa fa-angle-down"></span>
        </a>
        <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
          {this.props.items.map((item)=><TopNavDropDownItem key={item.name} item={item} onSelect={onSelect}/>)}

        </ul>
      </li>
    );
  }
}

export default TopNavDropDown;
