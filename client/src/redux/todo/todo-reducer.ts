import { todoAPI } from './../../api/api';
import { ListType, TaskType } from '../../api/api';
import { AppStateType, BasicThunkType, InferActionsType } from '../redux-store';
// import { toDoAPI } from "../api/api";

const SET_LISTS = 'SET-LISTS';
const SET_TASKS = 'SET-TASKS';
const CREATE_LIST = 'CREATE-LIST';
const DELETE_LIST = 'DELETE-LIST';
const RENAME_LIST = 'RENAME-LIST';
const IS_FETCH = 'IS-FETCH';

const initialState = {
    lists: [
        {
            "_id": "9f27f97b-bc63-4114-9baa-c91facbd4ffb",
            "title": "what todo",
            "addedDate": "2019-07-30T12:24:15.063",
            "order": 0
        }
    ] as Array<ListType>,
    tasks: [] as Array<TaskType>,
    isFetching: false
}

const toDoPage = (state = initialState, action: ActionsType): InitialStateType => {

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
        default: {
            return state;
        }
    }
}
export const actions = {
    setLists: (lists: Array<ListType>) => ({ type: SET_LISTS, lists } as const),
    setTasks: (tasks: Array<any>) => ({ type: SET_TASKS, tasks } as const),
    createList: (list: any) => ({ type: CREATE_LIST, list } as const),
    deleteList: (todolistId: string) => ({ type: DELETE_LIST, todolistId } as const),
    renameTitle: (todolistId: string, title: string) => ({ type: RENAME_LIST, todolistId, title } as const),
    isFetching: (bool: boolean) => ({ type: IS_FETCH, bool } as const),
}

export const getLists = (): ThunkType => async dispatch => {
    dispatch(actions.isFetching(true));
    let response = await todoAPI.getToDoLists();
    dispatch(actions.isFetching(false));
    (response.length !== 0) && dispatch(actions.setLists(response));
}

// export const postList = (title) => async (dispatch) => {
//     let response = await toDoAPI.postToDoLists(title);
//     (response.resultCode === 0) && dispatch(createList(response.data.item));
// }

// export const deleteListThunk = (todolistId) => async (dispatch) => {
//     let response = await toDoAPI.deleteToDoList(todolistId);
//     (response.resultCode === 0) && dispatch(deleteList(todolistId));
// }


// export const renameTitleThunk = (todolistId, title) => async (dispatch) => {
//     let response = await toDoAPI.renameToDoList(todolistId, title);
//     (response.resultCode === 0) && dispatch(renameTitle(todolistId, title))
// }

export default toDoPage;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType>
