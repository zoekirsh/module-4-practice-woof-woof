import React from 'react';
import './App.css';
import DogSpan from './DogSpan';
///import BigDogContainer from './BigDogContainer';

class App extends React.Component {

  state = {
    allDogs: [],
    doggos: [],
    selectedDog: {}, 
    filtered: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => this.setState({
      allDogs: dogs,
      doggos: dogs
      }
    ))
  }

  clickDog = (dog) => {
    this.setState({
      selectedDog: dog
    })
  }

  toggleDog = (e) => {
    e.persist()
    let goodDog = !this.state.selectedDog.isGoodDog
    let URL = `http://localhost:3000/pups/${this.state.selectedDog.id}`
    fetch(URL, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({isGoodDog: goodDog})
    })
    .then(res => res.json())
    .then(newDog => this.setState({
      selectedDog: newDog
    }))
  }

  filterDogs = () => {
    let filtered = this.state.allDogs.filter(dog => dog.isGoodDog === true)
    let unfiltered = this.state.doggos
    let toggle = !this.state.filtered
    if (this.state.filtered === true) {
      this.setState({
        allDogs: filtered,
        filtered: toggle
      })
    } else {
      this.setState({
        allDogs: unfiltered,
        filtered: toggle
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div id="filter-div">
          <button id="good-dog-filter" onClick={this.filterDogs}>{this.state.filtered == false ? "Filter good dogs: OFF" : "Filter good dogs: ON"}</button>
        </div>
        <div id="dog-bar">
          {this.state.allDogs.map(dog => <DogSpan dog={dog} handleClick={this.clickDog}/>)}
        </div>
        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            <img src={this.state.selectedDog.image}></img>
            <h2>{this.state.selectedDog.name}</h2>
            <button onClick={this.toggleDog}>{this.state.selectedDog.isGoodDog ? "GOOD DOG!" : "BAD DOG!" }</button>  
          </div>
        </div>
      </div>
    );
  }
}

export default App;
