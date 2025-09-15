import { staticCategories } from 'data/Categorias';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Category, CategoryContextType } from 'types/Category';


const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: true,
  error: null,
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setCategories(staticCategories);
    setLoading(false); 
  }, []); 

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);