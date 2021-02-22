import './App.css';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Room from './Room';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <div>Rooms</div>
            <div>
              <Link to={`/live/sport`}>sport</Link>
            </div>
            <div>
              <Link to={`/live/sport2`}>sport2</Link>
            </div>
            <div>
              <Link to={`/live/sport3`}>sport3</Link>
            </div>
          </Route>
          <Route exact path="/live/:room" component={Room} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
