import { InitialStateType } from './auth-reducer';
import { createSelector } from 'reselect';
import { AppStateType } from './../redux-store';

const getAuthPage: GetAuthPagetType = (store) => store.authR

export const getUserInfo = createSelector(getAuthPage, authPage => authPage.user)
export const getIsAuthorized = createSelector(getAuthPage, authPage => authPage.isAuthorized)

type GetAuthPagetType = (store: AppStateType) => InitialStateType 