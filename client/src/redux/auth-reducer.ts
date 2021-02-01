import { InferActionsType } from "./redux-store"

const SETAUTHORIZED = 'SN/AUTH-REDUCER/SET-IS-AUTHORIZED'
const SETUSER = 'SN/AUTH-REDUCER/SET-USER'


const initialState = {
   user: {
    firstName: null,
    lastName: null,
    token: null,
    userId: null
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
    setUser: (user) => ({type: SETUSER, user} as const)
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
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>