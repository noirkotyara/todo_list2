import './App.css';
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './components/Auth/AuthPage';
import { StarterPage } from './components/Common/Starter_page/StarterPage';
import 'materialize-css'

const App = () => {

  // const isAuthorized = useSelector()???

  return (
    <div className="container">
      {true
        ? (<Switch>
            <Route path='/start' component={() => <StarterPage />} />
            <Redirect to='/' />
        </Switch>)
        : (<Switch>
            <Route path='/' exact component={() => <AuthPage />} />
            <Redirect to='/' />
        </Switch>)
      }
    </div>
  )

}

export default App;


