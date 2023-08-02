import './App.css';
import { Route, Routes, HashRouter} from 'react-router-dom';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
