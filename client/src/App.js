import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import AuthHOC from './comps/authhoc/AuthHOC';
import './scss/style.scss';
import Loader from './comps/loader/Loader';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages

class App extends Component {

  componentDidMount() {
    // fetches the medicineList
    // const fetchMedicineData = async () => {
    //   const res = await fetch(`/api/data/products`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': `Bearer ${document.cookie.slice(11)} `
    //       }
    //     })
    //   if (res.status === 200) {
    //       const resData = await res.json()
    //       console.log('URUN EKLE resData is: ', resData)
    //       const arr = resData.map(obj => {
    //           return { İlaç: obj.medicine, barKod: obj.barcode, ATC_Kodu: obj.ATC_code , reçeteTürü: obj.prescription_type }
    //       })
    //       // setData(arr)
    //       this.props.dispatch({type: "FILL_MEDICINE_LIST", medicineList: arr})
    //   }
    // }

    //runs once to check if user is already logged in, so user doesn't attempt to re-login
    const isUserCookieValid = async () => {
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
        // fetchMedicineData()
      }
    }
  isUserCookieValid()
  }

  render() {
    return (
        <React.Suspense fallback={loading}>
          <Loader isLoading = {this.props.isLoading}>
            <Switch>
              <AuthHOC>  {/* AuthHOC: if user is accessed: render layout, if not, render Login and Register pages */}
                <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              </AuthHOC>
            </Switch>
          </Loader>
        </React.Suspense>
    );
  }
}

// getting the loading boolean value from REDUX STORE to use in LOADER component
function mapStateToProps (state) {
  return {
    isLoading: state.isLoading
  }
}

//binding redux STATE, redux DISPATCH and withRouter to APP component
export default connect(mapStateToProps)(withRouter(App));
