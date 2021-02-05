import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTasksThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import Task from './Task';
import style from './Tasks.module.scss';
import tasksIcon from './../../../assest/lightY.svg'
import { Tooltip } from 'antd';


type PropsType = {
    listId: string
}

const Tasks: React.FC<PropsType> = React.memo(props => {

    let [viewMode, changeViewMode] = useState(false);
    const dispatch = useDispatch()
    
    let viewTasks = (listId: string) => {
        changeViewMode(!viewMode);
        dispatch(getTasksThunk(listId))
        
    }
    return (
        <div className={style.content}>
            <Tooltip placement="right" title='Click to view your tasks'>
                <span  className={style.viewTasks} onClick={() => viewTasks(props.listId)}> <img src={tasksIcon} alt="task Icon"/> </span>
                </Tooltip>
            
            {viewMode && <div className={style.tasks_array}>
                <Task listId={props.listId}  />
            </div>}
            
        </div>
    );
});
export default Tasks;