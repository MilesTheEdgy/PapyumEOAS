import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AuthHOC from './comps/authhoc/AuthHOC';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  //runs once to check if user is already logged in, so user doesn't attempt to re-login
  // componentDidMount() {
  //   const submitHandeler = async () => {
  //     const response = await fetch(`/api`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': `Bearer ${document.cookie.slice(8)} `
  //       }
  //     })
  //     const data = await response.json()
  //     console.log(data);
  //   }
  //   submitHandeler()
  // }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
              <Switch>
                <AuthHOC>  {/* AuthHOC: if user is accessed: render layouth, if not, render Login and Register pages */}
                  <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
                </AuthHOC>
              </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
