import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


class ProfileDog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: "",
			nick: "",
			age: "",
			bio: "",
			imgurl: "",
			present: false,
			friends: [],
			insert: true
		}
	}

	getFriend(f) {

		let dog = this.props.dogsList.find(dog => dog.name === f);

		return dog.id;



	}


	handlePresent = async (e) => {

		await this.setState({
			present: e.target.checked
		});

		let { id, name, nick, age, bio, imgurl, present, friends } = this.state;

		this.props.saveDog(
			{ id, name, nick, age, bio, imgurl, present, friends },
			(this.props.insert) ? true : false
		);
	}


	render() {

		return (
			<div className="profile-container">

				<div className="profile-img-container">

					<img className="profile-img" src={this.state.imgurl}></img>

				</div>
				<div className="profile-info">



					<p>Name: {this.state.name}

						<NavLink className="profile-info-link" to={`/dog/${this.state.id}`}>edit</NavLink>

						{this.renderPresent()} Present


				</p>
					<p>Nick:  @{this.state.nick}</p>
					<p>Age: {this.state.nick}</p>
					<p>Bio: {this.state.bio}</p>

					<p>Friends</p>
					{this.state.friends.length > 0 && this.state.friends.map(friend => <NavLink className="button" to={`/profile/${this.getFriend(friend)}`}>{"@" + friend}</NavLink>)}

				</div>
				<div className="profile-back">

					<NavLink activeonlywhenexact="active" exact to='/'>{"< Go to users"}</NavLink>
				</div>

			</div>

		)
	}

	renderPresent() {
		if (this.state.present) {
			return (
				<input className="profile-info-cb" defaultChecked type="checkbox" id="present" name="present" onClick={e => this.handlePresent(e)}></input>
			)
		}
		else {
			return (
				<input className="profile-info-cb" type="checkbox" id="present" name="present" onClick={e => this.handlePresent(e)}></input>
			)
		}
	}

	componentDidMount() {

		let { dogsList } = this.props;

		let dog = dogsList.filter(dog => dog.id === parseInt(this.props.match.params.id))[0];
		if (dog) {
			this.setState({
				id: dog.id,
				name: dog.name,
				nick: dog.nick,
				age: dog.age,
				bio: dog.bio,
				imgurl: dog.imgurl,
				present: dog.present,
				friends: dog.friends
			});
		}
	}
}



ProfileDog.propTypes = {
	data: PropTypes.object.isRequired,
	saveDog: PropTypes.func.isRequired,
	deleteDog: PropTypes.func.isRequired

}

export default ProfileDog;
