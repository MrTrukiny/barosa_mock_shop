import { atom, selector } from 'recoil';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});

export const fetchProductList = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
};

export const productSelector = selector<Product[]>({
  key: 'productSelector',
  get: async ({ get }) => {
    const productList = get(productListState);
    if (productList.length === 0) {
      const data = await fetchProductList();
      return data;
    }
    return productList;
  },
});
