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
import ScrollToTop from './utils/ScrollToTop';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import OrderPage from './pages/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PaymentResultPage from './pages/PaymentResultPage';
import { LoggedRoute, UnLoggedRoute } from './utils/ProtectRoute';
import OrderList from './pages/OrderListPage';

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

          <Route element={<UnLoggedRoute />}>
            <Route path='/signup/' element={<SignupPage />} />
            <Route path='/login/' element={<LoginPage />} />
          </Route>

          <Route element={<LoggedRoute />}>
            <Route path='/order/:id/' element={<OrderDetailPage />} />
            <Route path='/cart/' element={<CartPage />} />
            <Route path='/profile/' element={<ProfilePage />} />
            <Route path='/order/' element={<OrderPage />} />
            <Route path='/payment/result/' element={<PaymentResultPage />} />
            <Route path='/order/all/' element={<OrderList />} />
          </Route>

        </Routes>

        <Footer />

        <ToastContainer
          position="bottom-right" autoClose={2500} hideProgressBar={true} newestOnTop
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      </BrowserRouter>
    </div>
  );
}

export default App;
