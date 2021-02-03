import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, postList } from '../../redux/todo/todo-reducer';
import { getIsFetching } from '../../redux/todo/todo-selectors';
import { Preloader } from '../Common/Preloader/Preloader';
import List from './List';
import style from './Lists.module.css';
// import List from './List';
// import Preloader from '../Common/Preloader';

const Lists = React.memo(props => {

    let [newTitle, changeNewTitle] = useState('');
    const isFetching = useSelector(getIsFetching)
    const dispatch = useDispatch()
    
    useEffect(() => {
        
        dispatch(getLists());
    }, []);
    
    let onTitleChangeText = (text: string) => {
        changeNewTitle(text);
    }

    let addTitle = () => {
        dispatch(postList(newTitle));
        changeNewTitle('');
    }

    return (<div>

        <div className={style.newTitle}>
            <span className={style.textTitle}>
                Enter new title
            </span>
            <div>
                <textarea value={newTitle} onChange={(e) => onTitleChangeText(e.currentTarget.value)}/>
                <input onClick={addTitle} type="button" value="Create" />
            </div>

        </div>
        {isFetching && <Preloader/>}
        <div className={style.content}>
            <List />
        </div>

    </div>)
});

export default Lists;