import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import PollPage from "./PollPage";
import LeaderBoardPage from "./LeaderBoardPage";
import NewPoll from "./NewPoll";

function App({ loading, dispatch }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <div className="App">
      <LoadingBar />

      {loading === true ? (
        <Login />
      ) : (
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/questions/:questionID" element={<PollPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(App);
