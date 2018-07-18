import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//App components
import Header from './Header';
import Home from './Home';
import About from './About';
import Teachers from './Teachers';
import Courses from './Courses';
import NotFound from './NotFound';
import Featured from './Featured';


// Show below is how to render a component 'inline'. The reason to do this
// is if you need to pass props to the component. See the /about route
const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      {/*The Switch Component will only render one Route component
        If none of the routes match any of the Route paths then the last one
        will act as the catch all */}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" render={() => <About title='About' /> }/>
        <Route exact path='/teachers' component={Teachers}/>
        <Route path='/teachers/:topic/:name' component={Featured}/>
        <Route path='/courses' component={Courses}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
