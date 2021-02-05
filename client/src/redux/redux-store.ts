import thunkMiddleware, { ThunkAction } from "redux-thunk";
import toDoReducer from "./todo/todo-reducer";
import authReducer from './auth/auth-reducer';
import { Action } from "redux";
import { toDoTasksReducer } from "./todo-tasks/todoTask-reducer";
const { combineReducers, createStore, applyMiddleware, compose } = require("redux");

const rootReducers = combineReducers({
    toDoR: toDoReducer,
    authR: authReducer,
    toDoTasksR: toDoTasksReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store;

type InferValueType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<InferValueType<T>>
export type BasicThunkType<A extends Action, R = Promise<void | string>> = ThunkAction<R, AppStateType, unknown, A>
export type AppStateType = ReturnType<typeof rootReducers>

export type BasicComponentType = React.ComponentType<{ store: AppStateType }>//for compose
