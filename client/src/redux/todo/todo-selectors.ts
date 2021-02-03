
import { createSelector } from 'reselect';
import { AppStateType } from './../redux-store';
import { InitialStateType } from './todo-reducer';

const getTodoPage: GetTodoPageType = (store) => store.toDoR

export const getLists = createSelector(getTodoPage, toDoR => toDoR.lists)
// export const getTasks = createSelector(getTodoPage, toDoR => toDoR.tasks)
export const getIsFetching = createSelector(getTodoPage, toDoR => toDoR.isFetching)
export const getTodoMessage = createSelector(getTodoPage, toDoR => toDoR.message)

type GetTodoPageType = (store: AppStateType) => InitialStateType 