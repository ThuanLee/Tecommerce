import './styles/App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage'
import Footer from './components/Footer';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id/' element={<ProductDetailPage />} />
          <Route path='/search/' element={<SearchPage />} />
          <Route path='/cart/' element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
