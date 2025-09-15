export type Category = {
  id: number;
  name: string;
  cor_hex: string;
  imagem: string | number; 
};

export type CategoryContextType = {
  categories: Category[];
  loading: boolean;
  error: any;
};