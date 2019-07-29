// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const {
  mbtiGetQuestions: getQuestions,
  mbtiSubmitAnswers: submitAnswers,
  mbtiGetResult: getResult,
} = createActions({
  [ActionTypes.MBTI_GET_QUESTIONS]: () => ({}),
  [ActionTypes.MBTI_SUBMIT_ANSWERS]: (answers: Object) => ({ answers }),
  [ActionTypes.MBTI_GET_RESULT]: (resultId: String) => ({ resultId }),
});
