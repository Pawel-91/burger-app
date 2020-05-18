import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Layout>
      <Switch>
        <Route path='/checkout/' component={Checkout}/> 
        <Route path='/orders' component={Orders} />
        <Route path='/' exact component={BurgerBuilder}/>
      </Switch>
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
