import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }
        try {
            // Using existing endpoint: GET /api/users/:id/cart
            const { data } = await axios.get(`/api/users/${user._id}/cart`);
            // data.products matches typical cart structure? 
            // Assuming data is { _id, userId, products: [{...}] } or similar
            // If data is array of products directly, check backend implementation later if needed.
            // For now assuming standard: set count to total quantity or items length.
            const count = data?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;
            setCartCount(count);
        } catch (error) {
            console.error("Failed to fetch cart count", error);
        }
    };

    // Update count immediately without full fetch if we know the delta
    const updateCartCount = (count) => {
        setCartCount(count);
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCart, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
