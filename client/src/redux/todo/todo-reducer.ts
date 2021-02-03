import { todoAPI } from './../../api/api';
import { ListType, TaskType } from '../../api/api';
import { AppStateType, BasicThunkType, InferActionsType } from '../redux-store';

const SET_LISTS = 'TDL/TODO-REDUCER/SET-LISTS';
const CREATE_LIST = 'TDL/TODO-REDUCER/CREATE-LIST';
const DELETE_LIST = 'TDL/TODO-REDUCER/DELETE-LIST';
const RENAME_LIST = 'TDL/TODO-REDUCER/RENAME-LIST';
const CHANGE_ORD = 'TDL/TODO-REDUCER/CHANGE-ORD';
const IS_FETCH = 'TDL/TODO-REDUCER/IS-FETCH';
const SETERROR = 'TDL/TODO-REDUCER/SET-ERROR'

const initialState = {
    lists: [] as Array<ListType>,
    isFetching: false,
    message: null as null | string
}

const toDoReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case SET_LISTS: {
            return {
                ...state,
                lists: action.lists
            }
        }
        case CREATE_LIST: {
            return {
                ...state,
                lists: [action.list, ...state.lists]
            }
        }
        case DELETE_LIST: {
            return {
                ...state,
                lists: state.lists.filter(list => list._id !== action.todolistId)
            }
        }
        case RENAME_LIST: {
            return {
                ...state,
                lists: state.lists.map(list => { if (list._id === action.todolistId) { return { ...list, title: action.title } } else return list })
            }
        }
        case IS_FETCH: {
            return {
                ...state,
                isFetching: action.bool
            }
        }
        case SETERROR: {
            return {
                ...state,
                message: action.message
            }
        }
        case CHANGE_ORD: {
            let a, indexs = 0;
            let array = state.lists;

            array.forEach((elem, index) => {
                if (elem._id === action.todolistId) {
                    indexs = index;
                }
            })

            a = array[indexs];
            array[indexs] = array[indexs + 1];
            array[indexs + 1] = a;
            return {
                ...state,
                lists: array.map(item => { return item })
            }
        }
        default: {
            return state;
        }
    }
}
export const actions = {
    setLists: (lists: Array<ListType>) => ({ type: SET_LISTS, lists } as const),
    createList: (list: any) => ({ type: CREATE_LIST, list } as const),
    deleteList: (todolistId: string) => ({ type: DELETE_LIST, todolistId } as const),
    renameTitle: (todolistId: string, title: string) => ({ type: RENAME_LIST, todolistId, title } as const),
    isFetching: (bool: boolean) => ({ type: IS_FETCH, bool } as const),
    setErrors: (message: null | string) => ({ type: SETERROR, message } as const),
    changeOrder: (todolistId: string, putAfterItemId: string) => ({ type: CHANGE_ORD, todolistId, putAfterItemId } as const)
}

export const getLists = (): ThunkType => async (dispatch, getState: () => AppStateType) => {

    try {
        dispatch(actions.isFetching(true))
        let response = await todoAPI.getToDoLists(getState().authR.user.token);
        dispatch(actions.isFetching(false))
        dispatch(actions.setLists(response))
        dispatch(actions.setErrors(response.message))
    } catch (e) {
        dispatch(actions.isFetching(false))
        dispatch(actions.setErrors(e.response.data.message))
    }


}

export const postList = (title: string): ThunkType => async (dispatch, getState: () => AppStateType) => {

    try {
        dispatch(actions.isFetching(true))
        let response = await todoAPI.postToDoLists(title, getState().authR.user.token)
        dispatch(actions.isFetching(false))
        dispatch(actions.createList(response))
        dispatch(actions.setErrors(response.message))
    } catch (e) {
        dispatch(actions.isFetching(false))
        dispatch(actions.setErrors(e.response.data.message))
    }
}

export const deleteListThunk = (todolistId: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actions.isFetching(true))
        let response = await todoAPI.deleteToDoList(todolistId, getState().authR.user.token)
        dispatch(actions.isFetching(false))
        dispatch(actions.deleteList(todolistId))
        dispatch(actions.setErrors(response.message))
    } catch (e) {
        dispatch(actions.isFetching(false))
        dispatch(actions.setErrors(e.response.data.message))
    }

}


export const renameTitleThunk = (todolistId: string, title: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actions.isFetching(true))
        let response = await todoAPI.renameToDoList(todolistId, title, getState().authR.user.token)
        dispatch(actions.isFetching(false))
        dispatch(actions.renameTitle(todolistId, title))
        dispatch(actions.setErrors(response.message))
    } catch (e) {
        dispatch(actions.isFetching(false))
        dispatch(actions.setErrors(e.response.data.message))
    }
}

export const changeOrderThunk = (todolistId: string, putAfterItemId: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actions.isFetching(true))
        let response = await todoAPI.reorderToDoList(todolistId, putAfterItemId, getState().authR.user.token)
        dispatch(actions.isFetching(false))
        dispatch(actions.changeOrder(todolistId, putAfterItemId));
        dispatch(actions.setErrors(response.message))
    } catch (e) {
        dispatch(actions.isFetching(false))
        dispatch(actions.setErrors(e.response.data.message))
    }

}

export default toDoReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>
