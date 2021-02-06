import React, { useState } from 'react';
import Description from './Description';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../redux/todo-tasks/todoTask-selectors';
import style from './Tasks.module.scss';
import { deleteTaskThunk, postTasksThunk, reorderTaskThunk, updateTaskThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import { TaskType } from '../../../api/api';
import { Formik } from "formik";
import { Form, Input } from 'formik-antd'
import arrowUp from './../../../assest/ArrowUp.svg';
import arrowDown from './../../../assest/ArrowDown.svg';
import deleteIcon from './../../../assest/delB.svg'
import { Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';

type PropsType = {
    listId: string
}

const Task: React.FC<PropsType> = React.memo(props => {

    const dispatch = useDispatch()
    const tasks = useSelector(getTasks)

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


    let setStatusModeFalse = (e: any, task: any) => {
        debugger
        changeEditMode(!editMode);
        dispatch(updateTaskThunk(props.listId, task._id, { ...task, title: TaskText }))
    }
    let changeCheckBox = (bool: boolean, task: any) => {
        let intBool = Number(bool);
        dispatch(updateTaskThunk(props.listId, task._id, { ...task, completed: intBool }))
    }

    let taskArray = tasks && tasks.map((task: TaskType, index: number, array: Array<TaskType>) => {
        if (task.listId === props.listId) {
            let date = new Date(task.startDate)
            return <div key={task._id} className={style.taskItem}>
                    <Checkbox checked={task.completed} //CHECKBOX
                        onChange={(e) => changeCheckBox(e.target.checked, task)}
                        className={`${style.complete} completed_checkbox`}
                        type='checkbox'
                    />
                    <div className={style.title}>
                        {(editMode && choosedTask === task._id)
                            ? <Formik
                            initialValues={{
                                title: TaskText
                            }}
                            onSubmit={(e) => setStatusModeFalse(e, task)}
                        >
                            {props => (
                                <Form onBlur={props.handleSubmit}>
                                    <Input className='list_input' name='title' autoFocus={true} onChange={(e) => setTaskText(e.currentTarget.value)} type='text' onBlur={props.handleBlur} />
                                </Form>
                            )}
                        </Formik>
                            : <span onDoubleClick={() => setStatusModeTrue(task.title, task._id)}>{task.title}</span>
                        }
                    </div>
                    <Tooltip placement="right" title='Delete task'>
                        <span onClick={() => deleteTask(task._id)} className={style.delete}>
                            <img src={deleteIcon} alt="delete task"/>
                        </span>
                    </Tooltip>

                    <div>
                        <Description
                            task={task}
                            taskId={task._id}
                            listId={props.listId} />
                    </div>
                    <div className={style.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</div>
                    <div className={style.arrows} > 
                        {index < array.length-1 && <div className={style.down} onClick={() => changeOrderTasks(array[index]._id, array[index+1]._id) }  ><img  src={arrowDown} alt='arrow_down'/> </div> }
                        {index > 0 && <div onClick={() => changeOrderTasks(array[index-1]._id, array[index]._id)}  className={style.up}><img src={arrowUp} alt='arrow_up'/></div> }
                    </div>
              
            </div>
        }
    });

    const submitHandler = (values: any, actions: any) => {
        dispatch(postTasksThunk(props.listId, values.title))
        actions.resetForm('')
    }

    return (
        <div>
            <div className={style.task_input}>
            <Formik initialValues={{title: ''}} onSubmit={submitHandler} >
                {props => (
                    <Form>
                        <Input name='title' type='text' onChange={props.handleChange} className='task_input'/>
                        <button type="submit"><span>Add</span></button>
                    </Form>
                )}
            </Formik></div>
            
            <div className={style.content_task}>
                {taskArray}
            </div>


        </div>
    );
});
export default Task;