import React, { createContext, useState } from 'react'
import PropType from "prop-types";

export const CartContext = createContext({});

export const CartContextListProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const handleAddCart = (quantity,newProduct) => {
        const product = cart.find(product => product.id === newProduct.id);
        if (!product) {
            setCart((prev) => [...prev, { ...newProduct, quantity }]);
        } else {
            const newListProduct = cart.map((product) => {
                if (product.id === newProduct.id) {
                    return { ...product, quantity: product.quantity + quantity };
                }
                return product;
            });
            setCart(newListProduct);
            localStorage.setItem("products", JSON.stringify({ newListProduct }));
        }
    };

    const handleProduct = () => {
        return cart
    }

    return (
        <CartContext.Provider value={{handleAddCart,handleProduct}}>
            {children}
        </CartContext.Provider>
      );
}

export default CartContextListProvider;
CartContextListProvider.propTypes = {
  children: PropType.object,
};




