import React from 'react';
import {Badge} from 'react-bootstrap';

const Content = (props) => {
  return (
    <div className="right_col" role="main" style={{minHeight:800}}>

      {props.category &&
      <div className="page-title">
        <div className="title_left">
          <h3>{props.category}</h3>
        </div>
      </div>
      }

      <div className="clearfix"></div>

      <div className="row">
        <div className="col-md-12">
          <div className="x_panel">

            {props.title &&
            <div className="x_title">
              <h2>{props.title} {props.badge && <span className="badge bg-green" style={{color:"white"}}>{props.badge}</span>}</h2>
              <div className="clearfix"></div>
            </div>
            }
            <div className="x_content">
              {props.children}
            </div>

          </div>
        </div>
      </div>

    </div>

  );
};

export default Content;
