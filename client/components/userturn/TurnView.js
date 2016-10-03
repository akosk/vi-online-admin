import React from 'react';
import {Panel} from 'react-bootstrap';
import moment from 'moment';
import {checkboxToTextFormatter} from'../../utils/formatters';




const TurnView = ({turn, signUpToTurn}) => {

  const handleOnClick=(e)=>{
    e.preventDefault();
    signUpToTurn(turn);
  }

  return (
    <div  className="row">
      <div className="col-sm-8 col-sm-offset-2">
        <Panel className="panel" header={turn.name}>
          <table className="table table-bordered">
            <tbody>
            <tr>
              <th>Képzés kezdés időpontja</th>
              <td>{moment(turn.training_start_at).format('LL').toString()}</td>
            </tr>
            <tr>
              <th >Aktív</th>
              <td>{checkboxToTextFormatter(turn.active)}</td>
            </tr>
            </tbody>
          </table>


          <div className="text-center">
            <button className="btn btn-primary" onClick={handleOnClick}>Jelentkezem a programra</button>
          </div>

        </Panel>
      </div>
    </div>
  );
}

export default TurnView;
