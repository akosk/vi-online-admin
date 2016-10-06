import React, { Component } from 'react';

class TopLeft extends Component {
  render() {
    return (
      <div>
        <div className="navbar nav_title" style={{border: 0}}>
          <a href="/" className="site_title">
            <span>&nbsp;<strong>Vállalkozz</strong> Itthon <strong>!</strong> </span>
          </a>
        </div>

        <div className="clearfix"></div>

        <div className="profile">
          <div className="profile_pic">
            <img src={`https://robohash.org/${this.props.displayName}`} alt="..."
                 className="img-circle profile_img"/>
          </div>
          <div className="profile_info">
            <span>Üdvözöljük,</span>
            <h2>{this.props.displayName}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default TopLeft;
