import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthenticationContext from './services/authentication/AuthenticationContext.jsx'
import CartContext  from './services/cart/CartContext.jsx'
import PayMethodContextProvider, { PayMethodContext } from './services/cart/PayMethodContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthenticationContext>
        <CartContext>
          <PayMethodContextProvider>
            <App />
          </PayMethodContextProvider>
        </CartContext>
      </AuthenticationContext>
  </React.StrictMode>
)
