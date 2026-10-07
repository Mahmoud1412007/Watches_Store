import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (watch) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === watch.id);
            if (existing) {
                return prev.map(item => item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...watch, quantity: 1 }];
        });
    };

    // الدالة المسئولة عن حذف منتج معين
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    // الدالة المسئولة عن تصفير السلة بعد إتمام الطلب
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};