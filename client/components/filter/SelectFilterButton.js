import React, { Component } from 'react';

class SelectFilterButton extends Component {

  onSelectFilterClick =(event)=>{
    event.stopPropagation();
    event.preventDefault();
    this.props.onSelectFilter(this.props.id);
  };

  render() {
    return (
      <a href="#" onClick={this.onSelectFilterClick}> <span className="fa fa-filter"></span></a>
    );
  }
}

export default SelectFilterButton;
