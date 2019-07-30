// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const {
  mbtiGetQuestions: getQuestions,
  mbtiSubmitAnswers: submitQuiz,
  mbtiGetResult: getResult,
} = createActions({
  [ActionTypes.MBTI_GET_QUESTIONS]: () => ({}),
  [ActionTypes.MBTI_SUBMIT_ANSWERS]: (email, answers) => ({ email, answers }),
  [ActionTypes.MBTI_GET_RESULT]: resultId => ({ resultId }),
});
