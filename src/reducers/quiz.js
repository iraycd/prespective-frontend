import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const questionState = {
  questions: [],
};

export default {
  quiz: handleActions(
    {
      [ActionTypes.MBTI_GET_QUESTIONS]: state =>
        immutable(state, {
          questions: [],
          status: { $set: STATUS.RUNNING },
        }),
      [ActionTypes.MBTI_GET_QUESTIONS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          questions: { $set: payload },
          status: { $set: STATUS.READY },
        }),
      [ActionTypes.MBTI_GET_QUESTIONS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          message: { $set: parseError(payload.message) },
          status: { $set: STATUS.ERROR },
        }),
    },
    questionState,
  ),
};
