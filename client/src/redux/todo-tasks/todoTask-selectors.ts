
import { createSelector } from 'reselect'
import { AppStateType } from '../redux-store';
import { InitialStateType } from './todoTask-reducer';
const getTodoPage: GetTodoPageType = (store) => store.toDoTasksR

export const getTasks = createSelector(getTodoPage, toDoTasksR => toDoTasksR.tasks)
export const getDefault = createSelector(getTodoPage, toDoTasksR => toDoTasksR.default)
export const getIsFetching = createSelector(getTodoPage, toDoTasksR => toDoTasksR.isFetching)
export const getTodoTaskMessage = createSelector(getTodoPage, toDoTasksR => toDoTasksR.message)

type GetTodoPageType = (store: AppStateType) => InitialStateType 