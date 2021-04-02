import './App.css';
import MyNavbar from './MyNavbar';
import ArticleList from './ArticleList';
import ArticleCreator from './ArticleCreator'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <div>
          <MyNavbar />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create_article">
              <ArticleCreator />
            </Route>
            <Route path="/">
              <div className="col d-flex justify-content-center">
                <ArticleList />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
      <br />
    </div>
  );
}

export default App;
