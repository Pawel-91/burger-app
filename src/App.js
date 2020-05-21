import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const OrdersAsync = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const CheckoutAsync = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const AuthAsync = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component{
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
      let routes = (
        <Switch>
          <Route path='/auth' component={AuthAsync}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );

      if(this.props.isAuthenticated) {
        routes = (
        <Switch>
          <Route path='/checkout/' component={CheckoutAsync}/> 
          <Route path='/orders' component={OrdersAsync} />
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={AuthAsync}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
        );
      }

      return (
      <BrowserRouter>
      <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
    </BrowserRouter>
    );
   }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
