import React from 'react';

const ContentTitle=(props) => {
    return (
      <div className="profile_title" style={{marginBottom:14}}>
        <div className="col-md-6">
          <h2>{props.title}</h2>
        </div>
      </div>
    );
}

export default ContentTitle;
