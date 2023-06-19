import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRecoilValueLoadable } from 'recoil';
import { productSelector } from '../../state/productState';
import ProductCard from './ProductCard';
import { Product } from '../../state/productState';

const AllProducts: React.FC = () => {
  const productList = useRecoilValueLoadable(productSelector);
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filterProducts = () => {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      const parsedSearchValue = parseFloat(lowerCaseSearchValue).toString();

      let filtered: Product[] = [];

      if (productList.state === 'hasValue') {
        filtered = productList.contents.filter((product) => {
          const matchesSearchValue =
            product.title.toLowerCase().includes(lowerCaseSearchValue) ||
            product.category.toLowerCase().includes(lowerCaseSearchValue) ||
            (parsedSearchValue && parseFloat(product.price.toString()) <= parseFloat(parsedSearchValue));

          const matchesCategory = categoryFilter === 'All' || product.category.toLowerCase() === categoryFilter;
          const matchesProduct = productFilter === '' || product.title.toLowerCase() === productFilter;

          return matchesSearchValue && matchesCategory && matchesProduct;
        });
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchValue, categoryFilter, productFilter, productList]);

  useEffect(() => {
    // Reset product filter when category filter changes
    setProductFilter('');
  }, [categoryFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductFilter(event.target.value.toLowerCase());
  };

  if (productList.state === 'loading') {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (productList.state === 'hasError') {
    return (
      <Box textAlign="center" mt={8}>
        <p>Error loading products. Please try again.</p>
      </Box>
    );
  }

  if (!Array.isArray(productList.contents)) {
    return (
      <Box textAlign="center" mt={8}>
        <p>No products available.</p>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <FormControl flex="1" mr={2}>
          <FormLabel fontSize="sm" mb={0} color="gray.600">
            Categories
          </FormLabel>
          <Select size="sm" value={categoryFilter} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </Select>
        </FormControl>
        <FormControl flex="1" ml={2}>
          <FormLabel fontSize="sm" mb={0} color="gray.600">
            Products
          </FormLabel>
          <Select size="sm" value={productFilter} onChange={handleProductChange}>
            <option value="">All Products</option>
            {/* Render options with product names */}
            {filteredProducts.map((product) => (
              <option key={product.id} value={product.title}>
                {product.title}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <InputGroup mb={4} position="relative">
        <InputLeftElement pointerEvents="none" color="gray.300" children={<SearchIcon />} />
        <Input
          placeholder="Search by name, price, or category"
          value={searchValue}
          onChange={handleSearchChange}
          pl="10"
        />
      </InputGroup>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllProducts;
