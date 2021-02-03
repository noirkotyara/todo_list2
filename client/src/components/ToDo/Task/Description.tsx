import style from './Tasks.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import { TaskType, UpdatedTaskType } from '../../../api/api';

type PropsType = {
    listId: string,
    task: any,
    taskId: string
}
const Description: React.FC<PropsType> = props => {

    let [editMode, changeEditMode] = useState(false);
    let [choosedTaskId, changeChoosedTaskId ] = useState('');
    let [newDesc, changeNewDesc] = useState(props.task.description);
    const dispatch = useDispatch()

    let turnEditMode = () => {
        changeEditMode(!editMode);
        changeChoosedTaskId(props.taskId);
    }

    let onChangeDesc = (newText: string) => {
        changeNewDesc(newText);
    }
    let updateDesc = (task: any) => {
        changeEditMode(!editMode);
        dispatch(updateTaskThunk(props.listId, task._id, {...task, description: newDesc}))
        debugger
    }
    
    return(
        <div>
            {(editMode && choosedTaskId === props.taskId)
            ? <textarea onBlur={() => updateDesc(props.task)} onChange={(e) => onChangeDesc(e.currentTarget.value)} autoFocus={true} value={newDesc}></textarea>
            :<span onDoubleClick={turnEditMode}>{props.task.description}</span>
            }
        </div>
    )
}
const DescriptionMemoization = React.memo(Description)
export default DescriptionMemoization