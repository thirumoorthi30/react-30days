import React, { createContext, useState, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import NavBar from "./Components/Pages/NavBar";

const Home = React.lazy(() => import("./Components/Pages/Home"));
const ProfileCardPage = React.lazy(() =>
  import("./Components/Profilepage/ProfileCardPage")
);
const Practice = React.lazy(() => import("./Components/Products/Content"));
const CounterApp = React.lazy(() =>
  import("./Components/CounterApp/CounterApp")
);
const TodoList = React.lazy(() => import("./Components/TodoList/TodoList"));
const Product = React.lazy(() => import("./Components/Products/Product"));
const ProductDetails1 = React.lazy(() =>
  import("./Components/Products/ProductDetails1")
);
const ProductList = React.lazy(() =>
  import("./Components/Products/ProductList")
);
const DigitalClock = React.lazy(() =>
  import("./Components/DigitalClock/DigitalClock")
);
const JokeApp = React.lazy(() => import("./Components/JokeApp/JokeApp"));
const NewProducts = React.lazy(() =>
  import("./Components/Products/NewProducts")
);
const UpdateProduct = React.lazy(() =>
  import("./Components/Products/UpdateProduct")
);
const Login = React.lazy(() => import("./Components/Auth/Login"));
const Signup = React.lazy(() => import("./Components/Auth/Signup"));
const Weather = React.lazy(() => import("./Components/Weather/Weather"));
const Shopping = React.lazy(() => import("./Components/ShoppingCart/Shopping"));
const Blog = React.lazy(() => import("./Components/Blog/Blog"));

export const userContext = createContext();
export const themeContext = createContext();

function AppContent() {
  const [user, setUser] = useState({
    name: "Thiru",
    role: "Frontend Developer",
    email: "thiru@example.com",
    phone: "123-456-7890",
  });

  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogin = (email) => setUser({ email });
  const handleSignup = (email) => setUser({ email });
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const isAuth = !!user;

  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <userContext.Provider
        value={{ user, handleLogin, handleSignup, handleLogout }}
      >
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
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/react-30days/">
      <AppContent />
    </BrowserRouter>
  );
}
