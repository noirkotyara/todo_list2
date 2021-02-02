import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions } from '../../../redux/auth/auth-reducer';
import { getIsAuthorized } from '../../../redux/auth/auth-selectors';

export const Header = () => {
    const isAuthorized = useSelector(getIsAuthorized)
    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch(actions.setIsAuthorized(false))
    }

    return (
        <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">MKdir</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {isAuthorized 
            ? <li><NavLink to='/logout' onClick={onLogOut}>Logout</NavLink></li>
            : <> <li><NavLink to='/login'>Log in</NavLink></li>
              <li><NavLink to='/regist' >Sign up</NavLink></li></>
            }
          </ul>
        </div>
        
      </nav>
    );
}