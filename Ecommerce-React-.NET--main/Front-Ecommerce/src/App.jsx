import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingPage/LandingPage';
import Register from './components/register/Register';
import Login from './components/login/Login';
import NotFound from './components/notFound/NotFound';
import MainLayout from './components/mainLayout/MainLayout';
import Products from './components/products/Products';
import ProductDetail from './components/productDetail/ProductDetail';
import Carrito from './components/carrito/Carrito';
import AddProducts from './components/addProducts/AddProducts';
import PayMethod from './components/payMethod/PayMethod';
import UpdateProducts from './components/updateProducts/UpdateProducts';
import Customers from './components/customers/Customers';
import UpdateCustomer from './components/updateCustomer/UpdateCustomer';
import DisplayCustomer from './components/displayCustomer/DisplayCustomer';
import DeleteCustomer from './components/deleteCustomer/DeleteCustomer';
import CreateCustomer from './components/createCustomer/CreateCustomer';
import Seller from './components/seller/Seller';
import CreateSeller from './components/createSeller/CreateSeller';
import DisplaySeller from './components/displaySeller/DisplaySeller';
import UpdateSeller from './components/updateSeller/UpdateSeller';
import DeleteSeller from './components/deleteSeller/DeleteSeller';
import { Order } from './components/order/Order';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ProtectedForClients from './components/protectedForClients/ProtectedForClients';
import ProtectedForSellers from './components/protectedForSellers/ProtectedForSellers';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <LandingPage />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element:
        <MainLayout>
          <Login />
        </MainLayout>
    },
    {
      path: "/registrarse",
      element:
        <MainLayout>
          <Register />
        </MainLayout>
    },
    {
      path: "/productos",
      element:
        <MainLayout children={<Products />}>
        </MainLayout>
    },
    {
      path: "/carrito",
      element:
        <ProtectedRoute children={<Carrito />}>
        </ProtectedRoute>
    },
    {
      path: "/producto/:id",
      element:
        <MainLayout children={<ProductDetail />}>
        </MainLayout>
    },
    {
      path: "/nuevoProducto",
      element:
        <ProtectedForClients children={<AddProducts />}>
        </ProtectedForClients>
    },
    {
      path: "/paymethod",
      element:
        <ProtectedRoute children={<PayMethod />}>
        </ProtectedRoute>
    },
    {
      path: "/order",
      element:
        <ProtectedRoute children={<Order />}>
        </ProtectedRoute>
    },
    {
      path: "/seller",
      element:
        <ProtectedForSellers children={<Seller />}>
        </ProtectedForSellers>
    },
    {
      path: "/createseller",
      element:
        <ProtectedForSellers children={<CreateSeller />}>
        </ProtectedForSellers>
    },
    {
      path: "/displayseller/:id",
      element:
        <ProtectedForSellers children={<DisplaySeller />}>
        </ProtectedForSellers>
    },
    {
      path: "/updateseller/:id",
      element:
        <ProtectedForSellers children={<UpdateSeller />}>
        </ProtectedForSellers>
    },
    {
      path: "/deleteseller/:id",
      element:
        <ProtectedForSellers children={<DeleteSeller />}>
        </ProtectedForSellers>
    },
    {
      path: "/customer",
      element:
        <ProtectedForSellers children={<Customers />}>
        </ProtectedForSellers>
    },
    {
      path: "/createcustomer",
      element:
        <ProtectedForSellers children={<CreateCustomer />}>
        </ProtectedForSellers>
    },
    {
      path: "/displaycustomer/:id",
      element:
        <ProtectedForSellers children={<DisplayCustomer />}>
        </ProtectedForSellers>
    },
    {
      path: "/updatecustomer/:id",
      element:
        <ProtectedForSellers children={<UpdateCustomer />}>
        </ProtectedForSellers>
    },
    {
      path: "/deletecustomer/:id",
      element:
        <ProtectedForSellers children={<DeleteCustomer />}>
        </ProtectedForSellers>
    },
    {
      path: "/updateproduct/:id",
      element:
        <ProtectedForClients children={<UpdateProducts />}>
        </ProtectedForClients>
    },
    {
      path: "*",
      element:
        <MainLayout children={<NotFound />}>
        </MainLayout>
    },
  ]);
  return (
    <div className="d-flex flex-column align-items-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
