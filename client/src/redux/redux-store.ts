import thunkMiddleware, { ThunkAction } from "redux-thunk";
import toDoPage from "./todo/todo-reducer";
import authReducer from './auth/auth-reducer';
import { Action } from "redux";
const { combineReducers, createStore, applyMiddleware } = require("redux");

const rootReducers = combineReducers({
    toDoPage,
    authR: authReducer
});

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store;

type InferValueType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<InferValueType<T>>
export type BasicThunkType<A extends Action, R = Promise<void | string>> = ThunkAction<R, AppStateType, unknown, A>
export type AppStateType = ReturnType<typeof rootReducers>

export type BasicComponentType = React.ComponentType<{ store: AppStateType }>//for compose
