import React from 'react';
import axios from 'axios';
//import { debounce } from "lodash";

export default class CharactersList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			persons: [],
		};
	}

	componentDidMount() {
		axios
			.get(`https://rickandmortyapi.com/api/character/?name=`)
			.then((res) => {
				let totalPages = res.data.info.pages;
				if (totalPages > 1) {
					let characters = this.state.persons;
					for (let i = 1; i <= totalPages; i++) {
						axios
							.get(`https://rickandmortyapi.com/api/character/?page=${i}`)
							.then((data) => {
								characters = characters.concat(data.data.results);
								if (totalPages === i) {
									this.setState({ persons: characters });
								}
							});
					}
				}
				this.setState({ persons: res.data.results });
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.namePerson !== prevProps.namePerson) {
			let namePerson = this.props.namePerson;
			if (namePerson.length > 2) {
				setTimeout(() => {
					axios
						.get(
							`https://rickandmortyapi.com/api/character/?name=${namePerson}`
						)
						.then((res) => {
							const totalPages = res.data.info.pages;
							let characters = [];
							if (totalPages > 1) {
								for (let i = 1; i <= totalPages; i++) {
									axios
										.get(
											`https://rickandmortyapi.com/api/character/?page=${i}&name=${namePerson}`
										)
										.then((data) => {
											characters = characters.concat(data.data.results);
											if (totalPages === i) {
												this.setState({ persons: characters });
											}
										});
								}
							}
							this.setState({
								persons: res.data.results,
							});
						});
				}, 500);
			}
		}
	}

	render() {
		return (
			<div className='characters-wrapper'>
				{this.state.persons.map((char) => (
					<div className='character-row tooltip' key={char.id}>
						<img src={char.image} alt={char.name} />
						<span className='tooltiptext'>
							Name: {char.name} <br />
							Status: {char.status} <br />
							Species {char.species}
						</span>
					</div>
				))}
			</div>
		);
	}
}
