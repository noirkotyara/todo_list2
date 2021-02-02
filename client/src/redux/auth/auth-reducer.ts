import { SignUpValuesType } from '../../components/Auth/SignUp/SignUp';
import { BasicThunkType, InferActionsType } from "../redux-store";
import { authAPI, UserType } from './../../api/api';
import { LogInValuesType } from './../../components/Auth/LogIn/LogIn';

const SETAUTHORIZED = 'TDL/AUTH-REDUCER/SET-IS-AUTHORIZED'
const SETUSER = 'TDL/AUTH-REDUCER/SET-USER'
const SETERROR = 'TDL/AUTH-REDUCER/SET-ERROR'

const initialState = {
    user: {
        firstName: null as null | string,
        lastName: null as null | string,
        token: null as null | string,
        userId: null as null | string
    },
    isAuthorized: false,
    message: null as null | string
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case SETAUTHORIZED: {
            return {
                ...state,
                isAuthorized: action.isAuthorized
            }
        }
        case SETUSER: {
            return {
                ...state,
                user: action.user
            }
        }
        case SETERROR: {
            return {
                ...state,
                message: action.message
            }
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setIsAuthorized: (isAuthorized: boolean) => ({ type: SETAUTHORIZED, isAuthorized } as const),
    setUser: (user: UserType) => ({ type: SETUSER, user } as const),
    setErrors: (message: null | string) => ({ type: SETERROR, message } as const)

}

export const signUpThunk = (user: SignUpValuesType): ThunkType => async (dispatch) => {
    try {
        let response = await authAPI.signUp(user)
        dispatch(actions.setErrors(response.message))
        return Promise.resolve('ok')
    } catch (e) {
        dispatch(actions.setErrors(e.response.data.message))
        return Promise.reject('!ok')
    }
}

export const logInThunk = (user: LogInValuesType): ThunkType => async (dispatch) => {

    try{
        let response = await authAPI.logIn(user)
        dispatch(actions.setUser(response))
        dispatch(actions.setIsAuthorized(true))
    }catch(e){
        dispatch(actions.setErrors(e.response.data.message))
    }
}


export default authReducer;
//types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>