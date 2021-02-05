import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, postList } from '../../redux/todo/todo-reducer';
import { getIsFetching } from '../../redux/todo/todo-selectors';
import { Preloader } from '../Common/Preloader/Preloader';
import List from './List';
import style from './Lists.module.scss';
import { Formik } from "formik";
import { Form, Input } from 'formik-antd'


const Lists = React.memo( () => {

    const isFetching = useSelector(getIsFetching)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getLists());
    }, []);

    const submitHandler = (values: any, actions: any) => {
        dispatch(postList(values.title))
        actions.resetForm('')
    }
    return (<div>

        <div className={style.newTitle}>
            <span className={style.textTitle}>
                Enter new title
            </span>
            <Formik
                initialValues={{
                    title: ''
                }}
                onSubmit={submitHandler}
            >
                {props => (
                    <Form>
                        <Input name='title' type='text' onChange={props.handleChange} />
                        <button type="submit"><span>Create</span></button>
                    </Form>
                )}
            </Formik>
        </div>

        {isFetching && <Preloader />}
        <div className={style.content}>
            <List />
        </div>

    </div>)
});

export default Lists;