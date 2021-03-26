import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';


import Home from '../components/Home';
import NotFound from '../components/NotFound';
import AddDog from '../components/AddDog';
import DogProfile from '../components/DogProfile';

class Routes extends React.Component {

	render() {

		let dogsList = this.props.dogsList;

		let saveDog = this.props.saveDog;

		let deleteDog = this.props.deleteDog;

		return (
			<Switch>
				<Route exact path='/' render={(props) => <Home {...props} dogsList={dogsList} saveDog={saveDog} deleteDog={deleteDog} />} />
				<Route path='/add-dog' render={(props) => <AddDog {...props} insert={true} saveDog={saveDog} dogsList={dogsList} />} />
				<Route path='/dog/:id' render={(props) => <AddDog {...props} insert={false} saveDog={saveDog} dogsList={dogsList} />} />
				<Route path='/profile/:id' render={(props) => <DogProfile {...props} dogsList={dogsList} saveDog={saveDog} key={Math.random()} />} />
				<Route component={NotFound} />
			</Switch>
		)
	}
}

Routes.propTypes = {
	dogsList: PropTypes.array.isRequired,
	saveDog: PropTypes.func.isRequired,
	deleteDog: PropTypes.func.isRequired
}

export default Routes;
