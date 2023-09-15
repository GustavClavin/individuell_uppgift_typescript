
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from './utils/contexts/UserContext';
import { ProductProvider } from "./utils/contexts/ProductContext";
import { OrderProvider } from "./utils/contexts/OrderContext";
import { AuthProvider } from "./utils/contexts/AuthContext";


import Store from './pages/Store'
import LogIn from "./pages/Login";
import ProductDetails from "./pages/productDetails";



const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
      <ProductProvider>
      <OrderProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Store />}> </Route>
          <Route path="/login" element={<LogIn />}> </Route>
          <Route path="/:id" element={<ProductDetails />}> </Route>

          
        </Routes>
      </AuthProvider>
      </OrderProvider>
      </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
