import { LogInValuesType } from './../components/Auth/LogIn/LogIn';
  
import axios from 'axios'
import { SignUpValuesType } from '../components/Auth/SignUp/SignUp';

const instance = axios.create({
    headers: { ['Content-Type']: 'application/json'}
});



export const authAPI = {
    logIn(user: LogInValuesType){  
        return instance.post(`/api/auth/login`,user)
        .then(response => response.data)
    },
    signUp(user: SignUpValuesType){
        return instance.post(`/api/auth/register`,user)
        .then(response => response.data)
    }
} 
export const todoAPI = {
    getToDoLists(){
        return instance.get(`/todo-lists`)
            .then(response => response.data)
    },
    // postToDoLists(title){
    //     return instance.post(`/todo-lists`, {title})
    //         .then(response => response.data);
    //         //resultCode messages[]
    //         // data -> item:{id title addedDate order}
    // },
    // renameToDoList(todolistId, title){
    //     return instance.put(`/todo-lists/${todolistId}`, {title})
    //         .then(response => response.data);
    //         //check response
    // },
    // deleteToDoList(todolistId){
    //     return instance.delete(`/todo-lists/${todolistId}`)
    //         .then(response => response.data);
    //         //resultCode messages[] data{}
    // },
    // reorderToDoList(todolistId: , putAfterItemId){
    //     //putAfterItemId: 'string'
    //     return instance.put(`/todo-lists/${todolistId}/reorder`, {putAfterItemId: putAfterItemId})
    //         .then(response => response.data);
    //         //resultCode messages[] data{}
    // }
}
export type UserType = {
    firstName: null | string,
    lastName: null | string,
    token: null | string,
    userId: null | string
}
export type ListType = {
   _id: string,
   title: string,
   addedDate: string,
   order: number 
}
export type TaskType = {
    description: string,
    title: string,
    priority: number,
    completed: boolean,
    startDate: string,
    deadline: string,
    order: number,
    listId: string
}