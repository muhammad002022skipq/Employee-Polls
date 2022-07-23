import { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';

import Dashboard from './Dashboard';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [])
  return (
    <div className="App">
      <LoadingBar />
      {props.loading === true ? null : <Dashboard />}
    </div>
  );
}
const mapStateToProps = ({ users }) => ({
  loading: users['mtsamis'] === undefined,
})

export default connect(mapStateToProps)(App);
