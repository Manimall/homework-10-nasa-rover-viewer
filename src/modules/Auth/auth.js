// Реализуйте редьюсер

import { handleActions } from 'redux-actions';
import { addKey } from './actions';
import { combineReducers } from "redux";

const apiKey = handleActions({
	[addKey]: (_state, action) => action.payload,
}, null);

export default combineReducers({
	apiKey,
});


export const getIsAuthorized = state => !!state.auth.apiKey;
export const getApiKey = state => state.auth.apiKey;
