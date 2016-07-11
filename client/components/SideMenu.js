import React, { Component } from 'react';
import  {LinkContainer} from'react-router-bootstrap';
import  {NavItem} from'react-bootstrap';
import classNames from 'classnames';

class SideMenu extends Component {
  render() {


    const menu = this.props.menu.map((category)=> {
      const categoryMenu = category.items.map((item)=>(
        <li
          className={classNames({
            'in-progress': item.inProgress,
            'completed': item.completed,
          })}
          key={item.name}><LinkContainer to={item.url}><a>{item.name}</a></LinkContainer></li>
      ));
      return (
        <li key={category.name} className="active"><a><i className={category.icon}></i> {category.name} <span
          className="fa fa-chevron-down"></span></a>
          <ul className="nav child_menu" style={{display: "block"}}>
            {categoryMenu}
          </ul>
        </li>
      );
    });
    return (
      <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
        <div className="menu_section active">
          <h3>&nbsp;</h3>
          <ul className="nav side-menu">
            {menu}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideMenu;
