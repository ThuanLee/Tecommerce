import './App.css';
import { Route, Routes, HashRouter} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <div className='app'>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id/' element={<ProductDetailPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
