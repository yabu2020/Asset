import React from 'react';

const Boxwrapper = ({ imageUrl, quantity, children }) => {
    return (
        <div className="box-wrapper flex flex-col items-center p-4 border rounded shadow-lg">
            <img src={imageUrl} alt="Category" className="w-24 h-24 object-cover mb-2" />
            <div className="flex flex-col items-center">
                {children}
            </div>
            <div className="text-lg font-bold text-gray-800 mt-2">Quantity: {quantity}</div>
        </div>
    );
};

export default Boxwrapper;
