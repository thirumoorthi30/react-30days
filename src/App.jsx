import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import Home from "./Components/Layout/Home";
import ProfileCardPage from "./Components/Profilepage/ProfileCardPage"; 
import Practice from "./Components/Products/Content";
import CounterApp from "./Components/CounterApp/CounterApp";
import TodoList from "./Components/TodoList/TodoList";
import Product from "./Components/Products/Product";
import ProductDetails1 from "./Components/Products/ProductDetails1";
import ProductList from "./Components/Products/ProductList";
import DigitalClock from "./Components/DigitalClock/DigitalClock";
import NavBar from "./Components/Layout/NavBar";
import JokeApp from "./Components/JokeApp/JokeApp";
import NewProducts from "./Components/Products/NewProducts";
import UpdateProduct from "./Components/Products/UpdateProduct";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Weather from "./Components/Weather/Weather";
import Shopping from "./Components/ShoppingCart/Shopping";
import Blog from "./Components/Blog/Blog";

export const userContext = createContext();
export const themeContext = createContext();

function AppContent() {
  const [user, setUser] = useState({
    name: "Thiru",
    role: "Frontend Developer",
    email: "thiru@example.com",
    phone: "123-456-7890"
  });

  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleLogin = (email) => setUser({ email });
  const handleSignup = (email) => setUser({ email });
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const isAuth = !!user;

  return (
    <userContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
      <themeContext.Provider value={{ theme, toggleTheme }}>
        {isAuth && <NavBar />}
        <Routes>
          {!isAuth ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile-card" element={<ProfileCardPage />} />
              <Route path="/counter-app" element={<CounterApp />} />
              <Route path="/practice-app/:name" element={<Practice />} />
              <Route path="/todo-list" element={<TodoList />} />
              <Route path="/product" element={<Product />}>
                <Route index element={<ProductList />} />
                <Route path="details" element={<ProductDetails1 />} />
                <Route path="list" element={<ProductList />} />
              </Route>
              <Route path="/new-product" element={<NewProducts />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/digital-clock" element={<DigitalClock />} />
              <Route path="/joke-app" element={<JokeApp />} />
              <Route path="/weather-app" element={<Weather />} />
              <Route path="/shoppingcart" element={<Shopping />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </themeContext.Provider>
    </userContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/react-30days/">
      <AppContent />
    </BrowserRouter>
  );
}
