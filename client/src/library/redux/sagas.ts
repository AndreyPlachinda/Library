import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import * as actions from './actions';
import {deleteBookApi, getBookInfoById, getBookList, updateBook} from "../../api";
import {getCurrentBookId, getCurrentBookInfo} from "./selectors";
import {message} from "antd";

function* getList() {
  try {
    const { data } = yield call(getBookList);
    yield put(actions.getBookList.done({
      params: undefined,
      result: data
    }));
  }
  catch (error) {
    console.error(error);
    yield put(actions.getBookList.failed({
      params: undefined,
      error,
    }));
  }
}

function* updateBookInfo() {
  try {
    const currentBookInfo = yield select(getCurrentBookInfo);
    const currentBookId = yield select(getCurrentBookId);
    yield call(updateBook, currentBookId, currentBookInfo);
    message.success('Изменения сохранены!');
    yield put(actions.saveChanges.done({ params: null, result: true }))
  }
  catch (error) {
    console.error(error);
    message.error('Сохранение зафейлилось');
    yield put(actions.saveChanges.failed({ error, params: null }));
  }
}

function* deleteBook() {
  try {
    const currentBookId = yield select(getCurrentBookId);
    yield call(deleteBookApi, currentBookId);
  }
  catch (error) {
    console.error(error);
  }
}

function* getInfoByBookId() {
  try {
    const currentBookId = yield select(getCurrentBookId);
    const { data } = yield call(getBookInfoById, currentBookId);
    yield put(actions.getBookInfoInitialize.done({ params: currentBookId, result: data }))
  }
  catch (error) {
    console.error(error);
    yield put(actions.getBookInfoInitialize.failed({ params: 0, error }))
  }
}
export function* saga() {
  yield all([
      takeLatest(actions.getBookList.started, getList),
      takeLatest(actions.saveChanges.started, updateBookInfo),
      takeLatest(actions.deleteBook, deleteBook),
      takeLatest(actions.getBookInfoInitialize.started, getInfoByBookId)
  ]);
}
