import { authAPI, UserType } from './../../api/api';
import { BasicThunkType, InferActionsType } from "../redux-store"
import { SignUpValuesType } from '../../components/Auth/SignUp/SignUp';

const SETAUTHORIZED = 'TDL/AUTH-REDUCER/SET-IS-AUTHORIZED'
const SETUSER = 'TDL/AUTH-REDUCER/SET-USER'


const initialState = {
   user: {
    firstName: null as null | string,
    lastName: null as null | string,
    token: null as null | string,
    userId: null as null | string
   },
   isAuthorized: false
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case SETAUTHORIZED: {
            return{
                ...state,
                isAuthorized: action.isAuthorized
            }
        }
        case SETUSER: {
            return{
                ...state,
                user: action.user
            }
        }
        default: {
            return state;
        }
    }
}

export const actions = {
    setIsAuthorized: (isAuthorized: boolean) => ({type: SETAUTHORIZED, isAuthorized} as const) ,
    setUser: (user: UserType) => ({type: SETUSER, user} as const)
}

export const signUpThunk = (user: SignUpValuesType): ThunkType => async (dispatch) => {
    try{
        let response = await authAPI.signUp(user)
        
        debugger 
    }catch(e){

    }
}
 
// export const getLists = () => async (dispatch) => {
//     dispatch(isFetching(true));
//     let response = await toDoAPI.getToDoLists();
//     dispatch(isFetching(false));
//     (response.length !== 0) && dispatch(setLists(response));
// }

// export const postList = (title) => async (dispatch) => {
//     let response = await toDoAPI.postToDoLists(title);
//     (response.resultCode === 0) && dispatch(createList(response.data.item));
// }


export default authReducer;
//types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>