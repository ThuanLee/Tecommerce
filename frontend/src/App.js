import './App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage'
import Footer from './components/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './utils/scrollToTop';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:id/' element={<ProductDetailPage />} />
          <Route path='/search/' element={<SearchPage />} />
          <Route path='/cart/' element={<CartPage />} />
          <Route path='/signup/' element={<SignupPage />} />
          <Route path='/login/' element={<LoginPage />} />
          <Route path='/profile/' element={<ProfilePage />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right" autoClose={2500} hideProgressBar={true} newestOnTop
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
