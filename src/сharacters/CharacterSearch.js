import React from 'react';
import CharactersList from './CharactersList';

export default class CharactersSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = { namePerson: '' };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (event) => {
		this.setState({ namePerson: event.target.value });
	};

	render() {
		const namePerson = this.state.namePerson;

		return (
			<React.Fragment>
				<input
					autoComplete='off'
					className='character-search'
					type='text'
					name='name'
					value={namePerson}
					onChange={this.handleChange}
				/>
				<CharactersList namePerson={namePerson} />
			</React.Fragment>
		);
	}
}
