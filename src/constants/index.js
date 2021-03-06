import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  SWITCH_MENU: undefined,
  EXCEPTION: undefined,
  USER_LOGIN: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  MBTI_GET_QUESTIONS: undefined,
  MBTI_GET_QUESTIONS_SUCCESS: undefined,
  MBTI_GET_QUESTIONS_FAILURE: undefined,
  MBTI_GET_RESULT: undefined,
  MBTI_GET_RESULT_SUCCESS: undefined,
  MBTI_GET_RESULT_FAILURE: undefined,
  MBTI_SUBMIT_ANSWERS: undefined,
  MBTI_SUBMIT_ANSWERS_SUCCESS: undefined,
  MBTI_SUBMIT_ANSWERS_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * @constant {Object} PERSONALITIES
 * @memberof Constants
 */
export const PERSONALITIES = {
  E: 'Extraversion',
  I: 'Introversion',
  S: 'Sensing',
  N: 'Intuition',
  T: 'Thinking',
  F: 'Feeling',
  J: 'Judging',
  P: 'Perceiving',
};
