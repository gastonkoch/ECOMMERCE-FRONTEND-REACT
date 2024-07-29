import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PayMethodContext = createContext();

export const PayMethodContextProvider = ({ children }) => {
    const [payMethod, setPayMethod] = useState([]);

    const handlePayMethod = (newPayMethod) => {
        setPayMethod(newPayMethod);
    };

    return (
        <PayMethodContext.Provider value={{ payMethod, handlePayMethod }}>
            {children}
        </PayMethodContext.Provider>
    );
};

export default PayMethodContextProvider;

PayMethodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
