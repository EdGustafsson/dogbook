import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';

class AddDog extends React.Component {
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
			dogs: [],
			insert: false,
			redirect: false
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChangeFriend(event) {
		if (!this.state.friends.includes(event.target.value) && event.target.value !== "none") {

			let temp = this.state.friends;
			temp.push(event.target.value);
			this.setState({ friends: temp });
		}
	}

	handleChecked = (e) => {
		this.setState({ [e.target.name]: e.target.checked });
	}

	deleteFriend(friend) {
		let temp = this.state.friends;
		temp = temp.filter(e => e !== friend);
		this.setState({ friends: temp });
	}

	handleSubmit = (e) => {
		e.preventDefault();

		let { id, name, nick, age, bio, imgurl, present, friends } = this.state;


		this.props.saveDog(
			{ id, name, nick, age, bio, imgurl, present, friends },
			(this.props.insert) ? true : false
		);

		this.setState({ redirect: true });

	}

	render() {

		if (this.state.redirect) {
			return (<Redirect to='/' />);
		}

		return (
			<div className="add-container">

				<div className="add-img-container">
					<img className="add-img" src={this.state.imgurl}></img>
				</div>
				<div className="add-info">



					<form onSubmit={this.handleSubmit}>


						<p>Name:
						<input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
						</p>

						<p>Nick:
						<input type="text" id="nick" name="nick" value={this.state.nick} onChange={this.handleChange} />
						</p>

						<p>Age:
						<input type="number" id="age" min="0" name="age" value={this.state.age} onChange={this.handleChange} />
						</p>

						<p>Bio:
						<input type="text" id="bio" name="bio" value={this.state.bio} onChange={this.handleChange} />
						</p>


						<p>Friends: </p>

						{this.state.friends.length > 0 && this.state.friends.map(friend => <div><span key={friend}>{friend}</span> <button onClick={() => this.deleteFriend(friend)}>X</button></div>)}

						<br></br>

						<select onChange={e => this.handleChangeFriend(e)}>
							<option value="none">
								Add dog friend
                   		 </option>
							{this.state.dogs && this.state.dogs.map(dog => <option key={dog} value={dog.name}>{dog.name}</option>)}
						</select>

						<br></br>
						<br></br>
						<button type="submit">Save</button>
					</form>
				</div>
				<div className="add-back">
					<p>{"< "}<NavLink activeonlywhenexact="active" exact to='/'>Go to users</NavLink></p>
				</div>
			</div>

		)
	}

	async componentDidMount() {

		let { dogsList, insert } = this.props;

		this.setState({ dogs: this.props.dogsList })


		if (!insert && this.props.match && this.props.match.params) {

			let dog = dogsList.filter(dog => dog.id === parseInt(this.props.match.params.id))[0];


			let otherDogs = [...this.props.dogsList];

			let index = otherDogs.findIndex(d => d.id === dog.id);

			otherDogs.splice(index, 1)

			if (dog) {
				this.setState({
					id: dog.id,
					name: dog.name,
					age: dog.age,
					nick: dog.nick,
					bio: dog.bio,
					friends: dog.friends,
					imgurl: dog.imgurl,
					dogs: otherDogs
				});
			}
		}
		else {

			let response = await fetch(`https://dog.ceo/api/breeds/image/random`);
			response = await response.json();
			this.setState({ imgurl: response.message });

		}
	}
}

AddDog.propTypes = {
	insert: PropTypes.bool.isRequired,
	saveDog: PropTypes.func.isRequired,
	dogsList: PropTypes.array
}

export default AddDog;
