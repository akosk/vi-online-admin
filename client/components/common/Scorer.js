import React, { Component } from 'react';
import ScorerField from './ScorerField';
import _ from 'lodash';

class Scorer extends Component {

  render() {
    const {schema,data,onSetScore}=this.props;
    return (
      <div>
        {schema.fields
               .map(field => <ScorerField key={field.rname} field={field} value={data[field.rname]}
                                          score={_.get(data,`ratings.${field.rname}`,0)}
                                          onSetScore={onSetScore}/>)
        }
      </div>
    );
  }
}

export default Scorer;
