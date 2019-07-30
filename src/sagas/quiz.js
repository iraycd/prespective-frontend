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

export function* getResult({ payload }) {
  try {
    const response = yield call(request, `http://localhost:5000/quiz/${payload.resultId}/result`);
    yield put({
      type: ActionTypes.MBTI_GET_RESULT_SUCCESS,
      payload: {
        resultId: payload.resultId,
        response,
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.MBTI_GET_RESULT_FAILURE,
      payload: err,
    });
  }
}

export function* submitAnswers({ payload }) {
  try {
    const response = yield call(request, 'http://localhost:5000/quiz', {
      method: 'POST',
      payload,
    });
    yield put({
      type: ActionTypes.MBTI_SUBMIT_ANSWERS_SUCCESS,
      payload: {
        resultId: response._id,
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.MBTI_SUBMIT_ANSWERS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Question Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.MBTI_GET_QUESTIONS, getQuestionList)]);
  yield all([takeLatest(ActionTypes.MBTI_GET_RESULT, getResult)]);
  yield all([takeLatest(ActionTypes.MBTI_SUBMIT_ANSWERS, submitAnswers)]);
}
