import React from 'react';
import {Badge} from 'react-bootstrap';

const Content = (props) => {

  const toolButtons = props.toolButtons ? props.toolButtons.map((item)=> {
      return (
        <li key={item.icon} style={{float:'right'}}>
          <a onClick={item.onClick} href="#" style={{padding:'0px 10px 0px 10px', fontSize:'21px'}}><i
            className={item.icon}></i></a>
        </li>);
    }
  ) : <div></div>;

  return (
    <div role="main"  >

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
              <h2>{props.title} {props.badge &&
              <span className="badge bg-green" style={{color:"white"}}>{props.badge}</span>}</h2>
              <ul className="nav navbar-right panel_toolbox">
                {toolButtons}
              </ul>

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
