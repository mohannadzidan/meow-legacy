import React from 'react';
import Navbar from './components/Navbar';
import Newsfeed from './components/Newsfeed';
import * as meow from './Meow.js';
import './Register';
import AuthPage from './Register';
import { MeowLoader } from './components/MeowLoader';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.render.bind(this);
  }

  componentDidMount() {

    this.state.loading = true;
    this.onUserStateChangeHandler = meow.addEventListener('onUserStateChange', (user) => {
      console.log(user);
      setTimeout(() => this.setState({ loading: false }), 1000);
      this.setState({ user: user });
    })
  }
  componentWillUnmount() {
    meow.removeEventListener('onUserStateChange', this.onUserStateChangeHandler);
  }

  render() {
    const query = new URLSearchParams(this.props.location.search);
    let content = undefined;
    if (this.state.user) {
      content = [
        <div >
          <div key={1} className='d-flex flex-column flex-sm-row'>
            <div className=''>
              <Sidebar query={query}/>
            </div>
            <Route exact path="/">
              <Newsfeed className='' />
            </Route>
          </div>
        </div>

      ]

    } else {
      content = [
        <AuthPage key={0} />,
        <MeowLoader key={1} hidden={!this.state.loading} />
      ];

    }

    return content;

  }
}
export default withRouter(App);
