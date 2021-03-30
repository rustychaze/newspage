import './App.css';
import MyNavbar from './MyNavbar';
import ArticleList from './ArticleList'

function App() {
  return (
    <div>
      <MyNavbar />
      <br />
      <div className="col d-flex justify-content-center">
      <ArticleList />
      </div>
      </div>
  );
}

export default App;
