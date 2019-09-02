// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом

import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure, changeSol } from "./actions";
import { createSelector } from "reselect";

const initialSol = {
	current: 1,
	min: 1,
	max: 100,
};

const fetchPhotosRequestObj = {
	isLoading: true,
	photos: [],
	isLoaded: false,
}

const initialPhotos = {
	curiosity: {},
	opportunity: {},
	spirit: {},
};

const sol = handleActions({
	[changeSol]: (state, action) => ({
		...state,
		current: action.payload
	}),
}, initialSol);

const photos = handleActions({
	[fetchPhotosRequest]: (state, action) => {
		const {sol, name} = action.payload;
		return {
			...state,
			[name]: {
				// ...state[name],
				[sol]: fetchPhotosRequestObj,
			}
		}
	},

	[fetchPhotosSuccess]: (state, action) => {
		const {sol, name, photos} = action.payload;
		return {
			...state,
			[name]: {
				// ...state[name],
				[sol]: {
					isLoaded: true,
					isLoading: false,
					photos,
				}
			}
		}
	},

	[fetchPhotosFailure]: (state, action) => {
		const {sol, name, error} = action.payload;
		return {
			...state,
			[name]: {
				// ...state[name],
				[sol]: {
					photos: [],
					isLoaded: true,
					isLoading: false,
					error,
				}
			}
		}
	}
}, initialPhotos);


export default combineReducers({
	sol,
	photos,
});


const photosSelector = (state) => state.roverPhotos.photos;

export const getSol = (state) => state.roverPhotos.sol;
export const getPhotos = createSelector(
	photosSelector,
	photos => photos
);
