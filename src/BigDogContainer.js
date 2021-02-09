import React from 'react';
// import Dog from './Dog';

class BigDogContainer extends React.Component {
  render() {
    return (
      <div>
      <img src={this.props.dog.image}></img>
      <h2>{this.props.dog.name}</h2>
      <button>{this.props.dog.isGoodDog ? "GOOD DOG!" : "BAD DOG!" }</button>  
      </div>    
    )
  }
}

export default BigDogContainer