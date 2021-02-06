// import { tasksAPI, toDoAPI } from "../api/api";

import { isTryStatement } from "typescript"
import { tasksAPI, TaskType, UpdatedTaskType } from "../../api/api"
import { AppStateType, BasicThunkType, InferActionsType } from "../redux-store"

const GET_TASKS = 'GET-TASKS'
const POST_TASK = 'POST-TASK'
const DEL_TASK = 'DEL_TASK'
const UPDATE_TASK = 'UPDATE-TASK'
const REORDER_TASK = 'REORDER-TASK'
const IS_FETCH = 'IS-FETCH';
const SETERROR = 'TDL/TODO-REDUCER/SET-ERROR'

const initialState = {
    tasks: [] as Array<TaskType>,
    default: {
        description: 'no desc',
        completed: false,
        status: 0,
        priority: 1,
        startDate: '2020',
        deadline: 'today'
    },
    isFetching: false,
    message: null as null | string
}

export const toDoTasksReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case POST_TASK: {
            return {
                ...state,
                tasks: [action.taskItem, ...state.tasks]
            }
        }
        case IS_FETCH: {
            return {
                ...state,
                isFetching: action.bool
            }
        }
        case DEL_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(elem => elem._id !== action.taskId)
            }
        }
        case UPDATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task._id === action.taskId) {
                        return action.item;
                    }
                    else return task;
                })
            }
        }
        case REORDER_TASK: {
            let a, indexs = 0;
            let array = state.tasks;

            array.forEach((elem, index) => {
                if (elem._id === action.taskId) {
                    indexs = index;
                }
            })

            a = array[indexs];
            array[indexs] = array[indexs + 1];
            array[indexs + 1] = a;
            return {
                ...state,
                tasks: array.map(item => { return item })
            }
        }
        default: {
            return state;
        }
    }
}

export const actionsTodoTask = {
    getTasks: (tasks: Array<TaskType>) => ({ type: GET_TASKS, tasks } as const),
    postTasks: (taskItem: TaskType) => ({ type: POST_TASK, taskItem } as const),
    deleteTask: (taskId: string) => ({ type: DEL_TASK, taskId } as const),
    updateTask: (taskId: string, item: any) => ({ type: UPDATE_TASK, taskId, item } as const),
    reorderTask: (taskId: string) => ({ type: REORDER_TASK, taskId } as const),
    isFetching: (bool: boolean) => ({ type: IS_FETCH, bool } as const),
    setErrors: (message: null | string) => ({ type: SETERROR, message } as const)

}


export const getTasksThunk = (todolistId: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actionsTodoTask.isFetching(true))
        let response = await tasksAPI.getTasks(todolistId, getState().authR.user.token)
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.getTasks(response))
        dispatch(actionsTodoTask.setErrors(response.message))
    } catch (e) {
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.setErrors(e.response.data.message))
    }
}

export const postTasksThunk = (todolistId: string, newTaskTitle: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actionsTodoTask.isFetching(true))
        let response = await tasksAPI.postTasks(todolistId, newTaskTitle, getState().authR.user.token);
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.postTasks(response));
        dispatch(actionsTodoTask.setErrors(response.message))
    } catch (e) {
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.setErrors(e.response.data.message))
    }
}

export const deleteTaskThunk = (todolistId: string, taskId: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(actionsTodoTask.isFetching(true))
        let response = await tasksAPI.deleteTasks(todolistId, taskId, getState().authR.user.token);
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.deleteTask(taskId));
        dispatch(actionsTodoTask.setErrors(response.message))
    } catch (e) {
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.setErrors(e.response.data.message))
    }
}

export const updateTaskThunk = (
    todolistId: string,
    taskId: string,
    updatedTaskObject: UpdatedTaskType): ThunkType => async (dispatch, getState: () => AppStateType) => {
        try {
            dispatch(actionsTodoTask.isFetching(true))
            let response = await tasksAPI.updateTasks(todolistId, taskId, updatedTaskObject, getState().authR.user.token);
            dispatch(actionsTodoTask.isFetching(false))
            debugger
            dispatch(actionsTodoTask.updateTask(taskId, response.updatedTask))
            dispatch(actionsTodoTask.setErrors(response.message))
        } catch (e) {
            dispatch(actionsTodoTask.isFetching(false))
            dispatch(actionsTodoTask.setErrors(e.response.data.message))
        }
    }

export const reorderTaskThunk = (todolistId: string, taskId: string, putAfterItemId: string): ThunkType => async (dispatch, getState: () => AppStateType) => {
    
    try{
        dispatch(actionsTodoTask.isFetching(true))
        let response = await tasksAPI.reorderTasks(todolistId, taskId, putAfterItemId, getState().authR.user.token)
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.setErrors(response.message))
    }catch(e){
        dispatch(actionsTodoTask.isFetching(false))
        dispatch(actionsTodoTask.setErrors(e.response.data.message))
    }
    
    dispatch(actionsTodoTask.reorderTask(taskId));
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actionsTodoTask>
type ThunkType = BasicThunkType<ActionsType>