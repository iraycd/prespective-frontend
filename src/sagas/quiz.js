/**
 * @module Sagas/MBTI
 * @desc MBTI Questions
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getQuestionList() {
  try {
    const response = yield call(request, 'http://localhost:5000/questions');
    yield put({
      type: ActionTypes.MBTI_GET_QUESTIONS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.MBTI_GET_QUESTIONS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Question Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.MBTI_GET_QUESTIONS, getQuestionList)]);
}
