import style from './Tasks.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskThunk } from '../../../redux/todo-tasks/todoTask-reducer';
import { TaskType, UpdatedTaskType } from '../../../api/api';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd'

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
    }
    
    return(
        <div className={style.desc}>
            {(editMode && choosedTaskId === props.taskId)
            ? <Formik
                            initialValues={{
                                title: newDesc
                            }}
                            onSubmit={() => updateDesc(props.task)}
                        >
                            {props => (
                                <Form onBlur={props.handleSubmit}>
                                    <Input className='list_input' name='title' autoFocus={true} onChange={(e) => onChangeDesc(e.currentTarget.value)} type='text' onBlur={props.handleBlur} />
                                </Form>
                            )}
                        </Formik>
            :<span  onDoubleClick={turnEditMode}>{props.task.description}</span>
            }
        </div>
    )
}
const DescriptionMemoization = React.memo(Description)
export default DescriptionMemoization