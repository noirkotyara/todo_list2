import { toDoAPI } from "../api/api";

const SET_LISTS = 'SET-LISTS';
const SET_TASKS = 'SET-TASKS';
const CREATE_LIST = 'CREATE-LIST';
const DELETE_LIST = 'DELETE-LIST';
const RENAME_LIST = 'RENAME-LIST';
const IS_FETCH = 'IS-FETCH';

const initial = {
    lists: [
        {
            "id": "9f27f97b-bc63-4114-9baa-c91facbd4ffb",
            "title": "what todo",
            "addedDate": "2019-07-30T12:24:15.063",
            "order": 0
        }
    ],
    tasks: [],
    isFetching: false
}

const toDoPage = (state = initial, action) => {

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
                lists: [action.list, ...state.lists ]
            }
        }
        case DELETE_LIST: {
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.todolistId)
            }
        }
        case RENAME_LIST: {
            return {
                ...state,
                lists: state.lists.map(list => {if (list.id === action.todolistId){return {...list, title: action.title}} else return list})
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
    setLists:(lists) => ({ type: SET_LISTS, lists }),
    setTasks:  (tasks) => ({ type: SET_TASKS, tasks }),
    createList: (list) => ({ type: CREATE_LIST, list }),
    deleteList: (todolistId) => ({type: DELETE_LIST, todolistId}),
    renameTitle: (todolistId, title: string) => ({type: RENAME_LIST, todolistId, title}),
    isFetching: (bool: boolean) => ({type: IS_FETCH, bool}),
}
// const setLists = (lists) => ({ type: SET_LISTS, lists });
// const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
// const createList = (list) => ({ type: CREATE_LIST, list });
// const deleteList = (todolistId) => ({type: DELETE_LIST, todolistId});
// const renameTitle = (todolistId, title) => ({type: RENAME_LIST, todolistId, title});
// const isFetching = (bool) => ({type: IS_FETCH, bool});

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

// export const deleteListThunk = (todolistId) => async (dispatch) => {
//     let response = await toDoAPI.deleteToDoList(todolistId);
//     (response.resultCode === 0) && dispatch(deleteList(todolistId));
// }


// export const renameTitleThunk = (todolistId, title) => async (dispatch) => {
//     let response = await toDoAPI.renameToDoList(todolistId, title);
//     (response.resultCode === 0) && dispatch(renameTitle(todolistId, title))
// }

export default toDoPage;