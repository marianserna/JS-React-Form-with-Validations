import React from 'react';
// Import the render function from a module called react-dom
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Welcome from './components/Welcome';

const Root = () => {
  return(
    <BrowserRouter>
      <div>
        { /* This is root route in Rails: What do I show in home page*/}
        <Match exactly pattern="/" component={Landing} />
        <Match exactly pattern="/login" component={LogIn} />
        <Match exactly pattern="/signup" component={SignUp} />
        <Match exactly pattern="/welcome" component={Welcome} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

// Pass which component is to be rendered and where (div with id of main in index.html)
render(<Root/>, document.querySelector('#main'));
