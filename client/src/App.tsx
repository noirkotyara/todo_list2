import 'materialize-css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserType } from './api/api';
import './App.css';
import { LogInPage } from './components/Auth/LogIn/LogIn';
import { SignUpPage } from './components/Auth/SignUp/SignUp';
import { Header } from './components/Common/Header/Header';
import { useMessage } from './components/Common/Hooks/message';
import { StarterPage } from './components/Common/Starter_page/StarterPage';
import { actions } from './redux/auth/auth-reducer';
import { getAuthMessage, getIsAuthorized, getUserInfo } from './redux/auth/auth-selectors';
import { getTodoMessage } from './redux/todo/todo-selectors';
import { getTodoTaskMessage } from './redux/todo-tasks/todoTask-selectors';

const App = () => {

  const isAuthorized = useSelector(getIsAuthorized)
  const user = useSelector(getUserInfo)
  const dispatch = useDispatch()
  const errorWrap = useMessage()
  const todoTaskError = useSelector(getTodoTaskMessage)
  const todoError = useSelector(getTodoMessage)
  const authError = useSelector(getAuthMessage)
  useEffect(() => {
    errorWrap(todoTaskError || todoError || authError)
    dispatch(actions.setErrors(null))
  }, [todoTaskError, todoError, authError])

  useEffect(() => {
    let user: UserType
    let isExist = localStorage.getItem('items')
    if (isExist !== null) {
      user = JSON.parse(isExist)
      if (user) {
        dispatch(actions.setUser(user))
        dispatch(actions.setIsAuthorized(true))
      }
    }
  }, [])

  useEffect(() => {
    
    if (isAuthorized === true) {
      localStorage.setItem('items', JSON.stringify(user))
    } else {
      localStorage.removeItem('items');
    }
  }, [isAuthorized])

  return (
    <div className="container">
      <Header />
      {isAuthorized
        ? (<Switch>
            <Route path='/start' exact render={() => <StarterPage />}></Route>
            <Redirect to='/start' />
        </Switch>)
        : (<Switch>
            <Route path='/login' exact render={() => <LogInPage />}></Route>
            <Route path='/regist' exact render={() => <SignUpPage />}></Route>
            <Redirect to='/login' />
        </Switch>)
      }
    </div>
  )

}

export default App;


