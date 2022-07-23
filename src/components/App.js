import { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

import PollPage from './PollPage';

function App(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.dispatch(handleInitialData());
    navigate('/login')
    console.log(props.authedUser)
  }, [])
  return (
    <div className="App">
      <LoadingBar />
      <Routes>
        <Route path='/login' element={<Login />} />

        {props.loading === true ? (null) : (
          <>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/questions/:questionID' element={<PollPage />} />
            <Route path='*' element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
})

export default connect(mapStateToProps)(App);
