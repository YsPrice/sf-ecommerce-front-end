import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Navbar} from './components/Navbar.jsx';
import {SearchBar} from './components/SearchBar.jsx';
import {Footer} from './components/Footer.jsx';
import {Home} from './pages/Home.jsx';
import {AboutPage} from './pages/About.jsx';
import {CategoriesPage} from './pages/Categories.jsx';
import {ProductDetailsPage} from './pages/Product.jsx';
import {SignInPage} from './pages/SignIn.jsx';
import {SearchPage} from './pages/SearchPage.jsx';
import {SignUpPage} from './pages/SignUp.jsx';
import {ProductsPage} from './pages/ProductsPage';
import { useSelector } from 'react-redux';
import ProductGrid from './components/ProductGrid';
import {CheckoutPage} from './pages/CheckoutPage'
function App() {
  const currentUser = useSelector((state) => state.user);




  return (
    
    <div className="app-container" style={{backgroundColor:'#f8f9fa'}}>
      <>
     
    <Router>
    <Navbar user={currentUser}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
    </Router>

<div>
    <Footer/>
    </div>
    </>
    </div>
  );
}

export default App;
