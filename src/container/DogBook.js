import React, { Component } from 'react';
import './DogBook.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/Routes';


class DogBook extends Component {

  state = {
    actualID: 0,
    dogsList: []
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();


    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {

    for (let key in this.state) {

      if (localStorage.hasOwnProperty(key)) {

        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {

          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {

    for (let key in this.state) {

      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  saveDog = (dog, insert = true) => {
    if (insert) {

      let id = (this.state.actualID + 1);

      dog.id = id;

      this.setState({
        dogsList: [...this.state.dogsList, dog], actualID: id
      });
    } else {
      this.setState({
        dogsList: this.state.dogsList.map(d => d.id === dog.id ? Object.assign({}, d, dog) : d)
      });
    }
  }

  deleteDog = (id) => {

    let newDogsList = [...this.state.dogsList];

    let index = newDogsList.findIndex(d => d.id === id);

    newDogsList.splice(index, 1)


    for (let i = 0; i < newDogsList.length; i++) {

      let dogsFriends = newDogsList[i].friends;
      let deleteIndex = dogsFriends.findIndex(d => d.id === id);
      console.log("deleteIndex: " + deleteIndex)


      newDogsList[i].friends.splice(deleteIndex, 1)

    }


    this.setState({ dogsList: newDogsList });
  }

  render() {
    let { dogsList } = this.state;
    return (
      <BrowserRouter>

        <div className="dog-book">

          <h2>DogBook</h2>

          <Routes
            dogsList={dogsList}
            saveDog={this.saveDog}
            deleteDog={this.deleteDog}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default DogBook;

