import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import UserDetail from './pages/userDetail';
import RepoDetail from './pages/repoDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<IndexPage/>}/>
        <Route path="/user-detail/:user_name" element={<UserDetail/>} />
        <Route path="/repo-detail/:repo_name/:sub_repo" element={<RepoDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
