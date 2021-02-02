
import { createSelector } from 'reselect';
import { AppStateType } from './../redux-store';
import { InitialStateType } from './todo-reducer';

const getTodoPage: GetTodoPageType = (store) => store.authR

export const getLists = createSelector(getTodoPage, todoPage => todoPage.lists)
export const getTasks = createSelector(getTodoPage, todoPage => todoPage.tasks)
export const getIsFetching = createSelector(getTodoPage, todoPage => todoPage.isFetching)

type GetTodoPageType = (store: AppStateType) => InitialStateType 