import { all, fork } from 'redux-saga/effects';

import app from './app';
import user from './user';
import quiz from './quiz';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app), fork(user), fork(quiz)]);
}
