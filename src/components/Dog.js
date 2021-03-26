import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Dog extends React.Component {

	handleClick = () => {
		this.props.deleteDog(this.props.data.id);
	}

	render() {

		let dog = this.props.data;

		return (
			<div className="dog-data">

				<NavLink to={`/profile/${dog.id}`}>{"@" + dog.nick}</NavLink>

				<button className="dog-delete-button" onClick={() => this.handleClick()}>X</button>

			</div>
		)
	}
}

Dog.propTypes = {
	data: PropTypes.object.isRequired,
	deleteDog: PropTypes.func.isRequired
}

export default Dog;
