import './App.css';
import MyNavbar from './MyNavbar';
import ArticleList from './ArticleList';
import Paginator from './Pagination';
import ArticleCreator from './ArticleCreator'
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ArticleAdminView from './ArticleAdminView';


function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const paginate = page => setCurrentPage(page);

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
            <Route path="/admin">
              <ArticleAdminView />
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
