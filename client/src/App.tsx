import 'materialize-css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserType } from './api/api';
import './App.css';
import { LogInPage } from './components/Auth/LogIn/LogIn';
import { SignUpPage } from './components/Auth/SignUp/SignUp';
import { Header } from './components/Common/Header/Header';
import { StarterPage } from './components/Common/Starter_page/StarterPage';
import { actions } from './redux/auth/auth-reducer';
import { getIsAuthorized, getUserInfo } from './redux/auth/auth-selectors';

const App = () => {

  const isAuthorized = useSelector(getIsAuthorized)
  const user = useSelector(getUserInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    // debugger
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


