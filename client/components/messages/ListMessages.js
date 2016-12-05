import './style.less';
import React from 'react';
import moment from 'moment';

const ListMessages = ({ messages }) => {
  const rMessages=messages && messages.slice().reverse();
  return (
    <div clasName="main-wrapper">
      {messages && rMessages.map((message)=> {
        return (
          <div className="message-container" key={message.created_at}>

              <div className="message-avatar">
                <div>
                <img src={`https://robohash.org/${message.from}`} alt="..."
                     className="img-circle img-responsive"
                    style={{
                      width:'50px',
                      height:'50px'
                    }}
                />


                <p>
                  {message.from}
                </p>
                </div>
              </div>

            <div className="message-content message-right">
              <div className="message-arrow"></div>
              <div style={{marginTop:24}}>
                {message.message}
              </div>
              <div style={{
                position:'absolute',
                right:0,
                top:0,
                borderRadius: '6px',
                textAlign:'right',
                background:'#efefef',
                width:'100%',
                padding:'6px',
                fontSize:10
              }}>
                {moment(message.created_at).format('YYYY. MMMM D. HH:ss')}
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
