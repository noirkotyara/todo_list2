import React, { useState } from 'react';
import Description from './Description';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../redux/todo-tasks/todoTask-selectors';
import style from './Tasks.module.css';
import { deleteTaskThunk, postTasksThunk, reorderTaskThunk, updateTaskThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import { TaskType } from '../../../api/api';

type PropsType = {
    listId: string
}

const Task: React.FC<PropsType> = React.memo(props => {

    const dispatch = useDispatch()
    const tasks = useSelector(getTasks)
    let [newTaskTitle, changeNewTask] = useState('');

    let [editMode, changeEditMode] = useState(false);
    let [TaskText, changeTaskText] = useState('');
    let [choosedTask, changeChoosedTask] = useState('');


    let deleteTask = (taskId: string) => {
        dispatch(deleteTaskThunk(props.listId, taskId))
    }

    let setTaskText = (text: string) => {
        changeTaskText(text);
    }

    let setStatusModeTrue = (text: string, taskId: string) => {
        changeChoosedTask(taskId)
        changeTaskText(text);
        changeEditMode(!editMode);
    }


    let changeOrderTasks = (taskId: string, putAfterItemId: string) => {
        dispatch(reorderTaskThunk(props.listId, taskId, putAfterItemId))
    }

    
    let setStatusModeFalse = (task: any) => {
        changeEditMode(!editMode);
        dispatch(updateTaskThunk(props.listId, task._id, {...task, title:TaskText}))
    }
    let changeCheckBox = (bool: boolean, task: any) => {
        let intBool = Number(bool);
        dispatch(updateTaskThunk(props.listId, task.id, {...task, completed: intBool }))
    }

    let taskArray = tasks && tasks.map((task: TaskType, index: number, array: Array<TaskType>) => {
        if (task.listId === props.listId) {
            let date = new Date(task.startDate)
            return <div key={task._id} className={style.taskItem}>
                <div>
                    {(editMode && choosedTask === task._id)
                        ? <input autoFocus={true} onBlur={() => setStatusModeFalse(task)} onChange={(e) => setTaskText(e.currentTarget.value)} type="text" value={TaskText} />
                        : <span onDoubleClick={() => setStatusModeTrue(task.title, task._id)}>{task.title}</span>
                    }
                    <span onClick={() => deleteTask(task._id)} className={style.delete}>X</span> 
                    <input checked={task.completed} //CHECKBOX
                        onChange={(e) => changeCheckBox(e.currentTarget.checked, task)}
                        className={style.complete}
                        type='checkbox'>

                    </input>
                    <div>
                        <Description
                            task={task}
                            taskId={task._id}
                            listId={props.listId} />
                    </div>
                    <div className={style.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</div>
                    <div>
                        {index < array.length - 1 && <input onClick={() => changeOrderTasks(array[index]._id, array[index + 1]._id)} type="button" value='-' />}
                        {index > 0 && <input onClick={() => changeOrderTasks(array[index - 1]._id, array[index]._id)} type="button" value='+' />}
                    </div>
                </div>
            </div>
        }
    });

    let onTaskChangeText = (text: string) => {
        changeNewTask(text);
    }

    let addTask = () => {

        dispatch(postTasksThunk(props.listId, newTaskTitle))
        changeNewTask('');
    }

    return (
        <div>
            <div>
                <textarea value={newTaskTitle} onChange={(e) => onTaskChangeText(e.currentTarget.value)} />
                <input onClick={addTask} type="button" value="Add" />
            </div>
            <div>
                {taskArray}
            </div>


        </div>
    );
});
export default Task;