import React from 'react';
import {Popover} from 'react-bootstrap';
import moment from 'moment';

const ListMessages = ({ messages }) => {
  const rMessages=messages && messages.slice().reverse();
  return (
    <div>
      {messages && rMessages.map((message)=> {
        return (
          <div key={message.created_at}>
            <div className="row" style={{marginBottom:48}}>

              <div className="col-md-1 col-xs-2 text-center">
                <img src={`https://robohash.org/${message.from}`} alt="..."
                     className="img-circle img-responsive"
                    style={{maxHeight:80}}
                />
                <span>{message.from}</span>
              </div>

              <div className="col-md-11 col-xs-10">
                <Popover
                  style={{
                    position:'inherit'
                  }}
                  id="popover-basic"
                  placement="right"
                  positionLeft={0}
                  positionTop={0}
                  title={moment(message.created_at).format('YYYY. MMMM D. HH:ss')}
                >
                  {message.message}
                </Popover>
              </div>

            </div>

          </div>
        );
      })
      }
    </div>
  );
}

export default ListMessages;
