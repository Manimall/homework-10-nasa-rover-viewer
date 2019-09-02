// Реализуйте саги

import { takeEvery, put, fork, select, call } from "redux-saga/effects";
import { fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure, changeSol } from "./actions";
import { getPhotos } from "./api";
import { getApiKey } from "../Auth";


function* fetchPhotosFlow(action) {
	const apiKey = yield select(getApiKey);
	const {sol, name} = action.payload;

	try {
		const response = yield call(getPhotos, apiKey, name, sol);
		yield put(fetchPhotosSuccess({ name, sol, photos: response.photos }));
		yield put(changeSol(sol));
	} catch(error) {
		yield put(fetchPhotosFailure(error));
	}
}

function* fetchPhotos() {
	yield takeEvery(fetchPhotosRequest, fetchPhotosFlow);
}

export default function*() {
	yield fork(fetchPhotos);
}