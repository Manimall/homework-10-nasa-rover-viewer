// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS

import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchPhotosRequest } from '../../modules/RoverPhotos/actions';
import { getSol, getPhotos } from '../../modules/RoverPhotos';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import styles from './RoversViewer.module.css';


const RoversViewer = (props) => {
	console.log(props);
	const { fetchPhotosRequest, photos, sol, sol: { current }, } = props;

	const getRoverNames = () => Object.keys(photos);
	const rovers = getRoverNames();

	const getPhotos = (sol) => {
		rovers.forEach(name => fetchPhotosRequest({name, sol}));
	};

	useEffect(() => {
		getPhotos(current);
	}, []);

	const changeSol = (value) => getPhotos(value);

	return (
		<div className={styles.root}>
			<SelectSol {...sol} changeSol={changeSol}/>
			<div className={styles.сontainer}>
				{rovers.map(item => {
					const currentPhotos = photos[item][current] ? photos[item][current].photos : [];

					return (
						<RoverPhotos key={item} photos={currentPhotos} name={item}/>
					)
				})}
			</div>
		</div>
	)
};


const mapStateToProps = (state) => ({
	sol: getSol(state),
	photos: getPhotos(state),
});

const mapDispatchToProps =  { fetchPhotosRequest };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoversViewer);
