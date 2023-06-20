import { atom, useRecoilState } from 'recoil';
import { Product } from './productState';

export interface Cart {
  orderId: string;
  products: Product[];
}

export const cartAtom = atom<Cart>({
  key: 'cart',
  default: {
    orderId: '',
    products: [],
  },
});

export const cartQuantityAtom = atom<number>({
  key: 'cartQuantity',
  default: 0,
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [cartQuantity, setCartQuantity] = useRecoilState(cartQuantityAtom);

  const addProduct = (product: Product) => {
    // If I already have the product in the cart, increment the quantity
    if (cart.products.some((p) => p.id === product.id)) {
      const newCart = {
        ...cart,
        products: cart.products.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        }),
      };
      setCart(newCart);
    }
    // Otherwise, add the product to the cart
    else {
      const newCart = {
        ...cart,
        products: [...cart.products, { ...product, quantity: 1 }],
      };
      setCart(newCart);
      setCartQuantity(cartQuantity + 1); // Increment cartQuantity by 1
    }
  };

  const removeProduct = (product: Product) => {
    const newCart = {
      ...cart,
      products: cart.products.filter((p) => p.id !== product.id),
    };
    setCart(newCart);
    setCartQuantity(cartQuantity - 1); // Decrement cartQuantity by 1
  };

  const updateProductQuantity = (product: Product, quantity: number) => {
    const newCart = {
      ...cart,
      products: cart.products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            quantity,
          };
        }
        return p;
      }),
    };
    setCart(newCart);
  };

  const getCartSubtotal = () => {
    return cart.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  // We need to apply a 15% tax to the subtotal
  const getCartTotal = (tax: number) => {
    return getCartSubtotal() * (1 + tax);
  };

  const getCartQuantity = () => {
    return cartQuantity;
  };

  return {
    cart,
    setCart,
    cartQuantity,
    setCartQuantity,
    addProduct,
    removeProduct,
    updateProductQuantity,
    getCartSubtotal,
    getCartTotal,
    getCartQuantity,
  };
};
