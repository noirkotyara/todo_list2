import { LogInValuesType } from './../components/Auth/LogIn/LogIn';

import axios from 'axios'
import { SignUpValuesType } from '../components/Auth/SignUp/SignUp';

const instance = axios.create({
    headers: {
        ['Content-Type']: 'application/json'
    }
});



export const authAPI = {
    logIn(user: LogInValuesType) {
        return instance.post(`/api/auth/login`, user)
            .then(response => response.data)
    },
    signUp(user: SignUpValuesType) {
        return instance.post(`/api/auth/register`, user)
            .then(response => response.data)
    }
}
export const todoAPI = {
    getToDoLists(token: string) {
        return instance.get(`/api/todo/lists`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    postToDoLists(title: string, token: string) {
        return instance.post(`/api/todo/lists`, { title }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    renameToDoList(todolistId: string, title: string, token: string) {
        return instance.put(`/api/todo/lists/${todolistId}`, { title }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    deleteToDoList(todolistId: string, token: string) {
        return instance.delete(`/api/todo/lists/${todolistId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    reorderToDoList(todolistId: string, putAfterItemId: string, token: string) {

        return instance.put(`/api/todo/lists/${todolistId}/reorder`, { putAfterItemId }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data);
    }
}

export const tasksAPI = {
    getTasks(todolistId: string, token: string){
        return instance.get(`/api/tasks/${todolistId}/tasks`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    postTasks(todolistId: string, title: string, token: string){
        return instance.post(`/api/tasks/${todolistId}/tasks`, {title}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    },
    deleteTasks(todolistId: string, taskId: string, token: string){
        return instance.delete(`/api/tasks/${todolistId}/tasks/${taskId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data);
    },
    updateTasks(todolistId: string, taskId: string, updateTask: UpdatedTaskType, token: string){
        return instance.put(`/api/tasks/${todolistId}/tasks/${taskId}`, updateTask, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data);
    },
    reorderTasks(todolistId: string, taskId: string, putAfterItemId: string, token: string){
        return instance.put(`/api/tasks/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data);
    }
}

export type UpdatedTaskType = {
    title: string,
    completed: boolean,
    deadline: Date,
    description: string
}

export type TaskType = {
    _id: string,
    description: String,
    title:  string,
    // priority: Number,
    completed: boolean,
    startDate: Date,
    deadline: string,
    order: number,
    listId: string,
}

export type UserType = {
    firstName: null | string,
    lastName: null | string,
    token: null | string
}

export type ListType = {
    _id: string,
    title: string,
    addedDate: Date,
    order: number,
    tasks: Array<any>  ////????any
}
