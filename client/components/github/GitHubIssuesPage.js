import React, { Component, PropTypes } from 'react';
import {Panel,Media,Label} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import Content from '../common/Content';

const itemView = (item)=> {
  return (
    <div key={item.number}>
      <Media>
        <Media.Left align="middle">
          <img width={54} height={54} src={item.user.avatar_url} alt="Image" className="img-circle"/>
        </Media.Left>
        <Media.Body>

          <p><strong>#{item.number}</strong> {item.title}</p>
          <p>
            {item.labels.map((l)=><Label style={{backgroundColor:`#${l.color}`,color:'white'}}>{l.name}</Label>)}
          </p>
          <em className="pull-right">
            {item.closed_at ?
              `Lezárva: ${moment(item.closed_at).format('LLL')}`
              : `Nyitva: ${moment(item.created_at).format('LLL')}`}</em>
        </Media.Body>
      </Media>
      <hr style={{margin:0}}/>
    </div>
  );
};

class GitHubIssuesPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    axios.get('http://api.github.com/repos/akosk/vi-online-admin/issues').then(
      (data)=> {
        this.setState({ data: data.data });
      }
    );
    axios.get('http://api.github.com/repos/akosk/vi-online-admin/issues?state=closed').then(
      (data)=> {

        this.setState({ done: _.orderBy(data.data,'closed_at','desc') });
      }
    );
  }

  render() {
    let list = [];
    let list2 = [];
    if (this.state.data) {
      list = this.state.data.map(itemView);
    }
    if (this.state.done) {
      list2 = this.state.done.map(itemView);
    }
    return (
      <Content category="Fejlesztés" title="Feladatok">
        <div className="row">
          <div className="col-sm-6">
            <Panel className="panel-primary" header="Aktuális fejlesztendő feladatok">
              {list}
            </Panel>
          </div>
          <div className="col-sm-6">
            <Panel className="panel-success" header="Elkészült feladatok">
              {list2}
            </Panel>
          </div>
        </div>
      </Content>
    );
  }
}

export default GitHubIssuesPage;
