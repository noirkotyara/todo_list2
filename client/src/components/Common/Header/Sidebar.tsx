import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionsAuth } from '../../../redux/auth/auth-reducer';
import styles from './Header.module.scss';
import { getUserInfo } from '../../../redux/auth/auth-selectors';

export const Sidebar: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector(getUserInfo)
  const showDrawer = () => {
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
  }
  const dispatch = useDispatch()
  const onLogOut = () => {
        dispatch(actionsAuth.setIsAuthorized(false))
        dispatch(actionsAuth.setUser(null))
      }
  let title = `${user?.firstName} ${user?.lastName}`
  
  return (
    <>
      <span onClick={showDrawer} className={styles.info}>
        Info
      </span>
      <Drawer
        title={title}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >

        <Button onClick={onLogOut}>LogOut</Button>
        
      </Drawer>
    </>
  );
};






//////////////////////
// export const Sidebar = () => {
//   const dispatch = useDispatch()

//   const onLogOut = () => {
//     dispatch(actions.setIsAuthorized(false))
//     dispatch(actions.setUser(null))
//   }

//   return (
//     <div>
//       <nav>navbar </nav>
//       <ul id="slide-out" className="sidenav">
//       <li>
//         <div className="user-view">
//           <div className="background">
//             {/* <img src="images/office.jpg"/> */}
//           </div>
//           {/* <a href="#user"><img className="circle" src="images/yuna.jpg"/></a> */}
//           <a href="#name"><span className="white-text name">John Doe</span></a>
//           <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
//         </div>
//       </li>
//       <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
//       <li><NavLink to='/logout' onClick={onLogOut}>Logout</NavLink></li>
      
//       <li><div className="divider"></div></li>
//       <li><a className="subheader">Subheader</a></li>
//       <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
//       </ul>
//     </div>)
// }