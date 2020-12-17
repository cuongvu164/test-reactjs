import React from 'react';

class Card extends React.Component {

  render() {
    
    return (      
      <div style={{border: '1px solid green', padding: '10px'}}>
        {this.props.children}
      </div>
    )
  }s
}

export default Card