import style from './Lists.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../redux/todo/todo-selectors';
import { ListType, UserType } from '../../api/api';
import { changeOrderThunk, deleteListThunk, renameTitleThunk } from '../../redux/todo/todo-reducer';
import Tasks from './Task/Tasks';


const List: React.FC<any> = (props) => {

    let [editMode, changeEditMode] = useState(false);
    let [choosedTitle, changeTitle] = useState('');
    let [newTitleText, changeNewTitleText] = useState('');
    const dispatch = useDispatch()
    const lists = useSelector(getLists)


    let deleteList = (todolistId: string) => {
        dispatch(deleteListThunk(todolistId));
    }

    let updateTitle = () => {
        //thunk
        dispatch(renameTitleThunk(choosedTitle, newTitleText));
        changeEditMode(false);
        changeNewTitleText('');
    }

    let activateEditMode = (text: string, id: string) => {
        changeTitle(id);
        changeNewTitleText(text);
        changeEditMode(true);
    }
    let changeOrder = (todolistId: string, putAfterItemId: string) => {
        dispatch(changeOrderThunk(todolistId, putAfterItemId));
    }

    let listsArray = lists && lists.map((list: ListType, index: number, array: Array<ListType>) => {
        let date = new Date(list.addedDate)
        return (<div key={list._id} className={style.listUI}>
            <div className={style.title}>
                <span>
                    {(editMode && list._id === choosedTitle)
                        ? <input onBlur={updateTitle} autoFocus={true} onChange={(e) => changeNewTitleText(e.currentTarget.value)} value={newTitleText}></input>
                        : <span onDoubleClick={() => activateEditMode(list.title, list._id)}>{list.title}</span>
                    }
                </span>
                <span onClick={() => deleteList(list._id)} className={style.delTitle}>
                    X
                </span>
            </div>
            <div className={style.tasks}>
                <div>
                    <Tasks listId={list._id}/>
                </div>
            </div>
            <div> 
                {index < array.length-1 && <input onClick={() => changeOrder(array[index]._id, array[index+1]._id)} type="button" value='-'/> }
                {index > 0 && <input onClick={() => changeOrder(array[index-1]._id, array[index]._id)} type="button" value='+'/> }
             </div>
             <div className={style.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</div>
        </div>);
    });

    return (<>
        {listsArray}
    </>);
}
export default List;