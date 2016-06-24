import React, { Component, PropTypes } from 'react';
import {Panel,Media} from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';


class GitHubIssuesPage extends Component {

  constructor(props,context) {
    super(props,context);
    this.state={};
  }

  componentWillMount() {
    axios.get('http://api.github.com/repos/akosk/vi-online-admin/issues').then(
      (data)=> {
        this.setState({data:data.data});
      }
    )
  }

  render() {
    let list=[];
    if (this.state.data) {
     list= this.state.data.map((item)=><li key={item.title}>{item.title}</li>);
     list= this.state.data.map((item)=>(
       <div>
       <Media >
         <Media.Left align="middle">
           <img width={54} height={54} src={item.user.avatar_url} alt="Image" className="img-circle"/>
         </Media.Left>
         <Media.Body>
           <Media.Heading>#{item.number}</Media.Heading>
           <p>{item.title}</p>
         </Media.Body>
       </Media>
       <hr/>
         </div>
     ));
    }
    return (
      <Panel className="panel-primary" header={(
        <span>
        Aktuális fejlesztendő feladatok
        </span>
        )}>

        <div >
          {list}
        </div>

      </Panel>
    );
  }
}




export default GitHubIssuesPage;
