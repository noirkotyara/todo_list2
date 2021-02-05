import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTasksThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import Task from './Task';
import style from './Tasks.module.scss';
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
        <div>
            <span  className={style.viewTasks} onClick={() => viewTasks(props.listId)}> + </span>
            {viewMode && <div className={style.tasks_array}>
                <Task listId={props.listId}  />
            </div>}
            
        </div>
    );
});
export default Tasks;