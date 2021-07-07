import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux"
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

class App extends Component {

  //runs once to check if user is already logged in, so user doesn't attempt to re-login
  componentDidMount() {
    const submitHandeler = async () => {
      const response = await fetch(`/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${document.cookie.slice(11)} `
        }
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log('still authorized, routing to dashboard...')
        this.props.dispatch({type: 'FILL_USER_SETTINGS', eczaneName: data.eczaneName, username: data.username})
        this.props.dispatch({type: 'FILL_USER_INFO', bakiye: data.bakiye})
        this.props.dispatch({type: 'LOG_IN'})
        this.props.history.push('/dashboard')
      }
    }
    submitHandeler()
  }

  render() {
    return (
        <React.Suspense fallback={loading}>
            <Switch>
              <AuthHOC>  {/* AuthHOC: if user is accessed: render layouth, if not, render Login and Register pages */}
                <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              </AuthHOC>
            </Switch>
        </React.Suspense>
    );
  }
}

export default connect()(withRouter(App));
