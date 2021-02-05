import style from './Lists.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../redux/todo/todo-selectors';
import { ListType, UserType } from '../../api/api';
import { changeOrderThunk, deleteListThunk, renameTitleThunk } from '../../redux/todo/todo-reducer';
import Tasks from './Task/Tasks';
import {DeleteOutlined} from '@ant-design/icons';
import arrowUp from './../../assest/ArrowUp.svg';
import arrowDown from './../../assest/ArrowDown.svg';


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
                <span className={style.edit_title}>
                    {(editMode && list._id === choosedTitle)
                        ? <input onBlur={updateTitle} autoFocus={true} onChange={(e) => changeNewTitleText(e.currentTarget.value)} value={newTitleText}></input>
                        : <span className={style.listTitle} onDoubleClick={() => activateEditMode(list.title, list._id)}>{list.title}</span>
                    }
                </span>
                <span onClick={() => deleteList(list._id)} className={style.del_title}>
                    <DeleteOutlined />
                </span>
            </div>
            <div className={style.tasks}>
                    <Tasks listId={list._id}/>
            </div>
            <div className={style.arrows} > 
                {index < array.length-1 && <div className={style.down} onClick={() => changeOrder(array[index]._id, array[index+1]._id) }  ><img  src={arrowDown} alt='arrow_down'/> </div> }
                {index > 0 && <div onClick={() => changeOrder(array[index-1]._id, array[index]._id)}  className={style.up}><img src={arrowUp} alt='arrow_up'/></div> }
             </div>
             <div className={style.date}>{date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</div>
        </div>);
    });

    return (<>
        {listsArray}
    </>);
}
export default List;