import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actionsAuth } from '../../../redux/auth/auth-reducer';
import { getIsAuthorized } from '../../../redux/auth/auth-selectors';
import { Sidebar } from './Sidebar';
import styles from './Header.module.scss';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


export const HeaderH = () => {
    const isAuthorized = useSelector(getIsAuthorized)
    const dispatch = useDispatch()

    return (
      //   <nav>
      //   <div className={styles.nav_wrapper}>
      //     <a href="#" className="brand-logo">MKdir</a>
          
      //     <ul id="nav-mobile" className="right hide-on-med-and-down">
      //       {isAuthorized 
      //       ? <li>< Sidebar /></li>
      //       : <> <li><NavLink to='/login'>Log in</NavLink></li>
      //         <li><NavLink to='/regist' >Sign up</NavLink></li></>
      //       }
      //     </ul>
      //   </div>
        
      // </nav>
      
<Layout>
    <Header>
       
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
        <span className={styles.logo}>
         <NavLink to='/' className={styles.logo_link}> MKdir </NavLink>
        </span>
        {isAuthorized 
            ? <Menu.Item style={{float: "right"}} key="1">< Sidebar /></Menu.Item>
            : <><Menu.Item style={{float: "right"}} key="2"><NavLink to='/login'>Log in</NavLink></Menu.Item>
              <Menu.Item style={{float: "right"}} key="3"><NavLink to='/regist' >Sign up</NavLink></Menu.Item></>
            }
      </Menu>
      <Content >
      
    </Content>
    </Header>
    
  </Layout>)

 
 
  
}