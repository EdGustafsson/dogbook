import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dog from './Dog';


class Home extends React.Component {
	render() {
		const dogs = this.props.dogsList.map((item, i) => <Dog key={i} data={item} deleteDog={this.props.deleteDog} />);
		return (
			<div>
				<h2>Users</h2>

				{dogs}

				<br></br>
				<NavLink activeonlywhenexact="active" exact to='/add-dog'>Create new dog</NavLink>
			</div>
		)
	}
}

Home.propTypes = {
	dogsList: PropTypes.array.isRequired,
	deleteDog: PropTypes.func.isRequired
}

export default Home;
