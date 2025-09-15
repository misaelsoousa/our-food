import { Category } from "types/Category";
import burger from 'assets/img/burguer.png';
import pizza from 'assets/img/pizza.webp';
import marmita from 'assets/img/marmita.png';
import doce from 'assets/img/doce.png';
import refri from 'assets/img/refri.png';
   
   
export const staticCategories: Category[] = [
      {
        id: 1,
        name: 'Pizzas',
        cor_hex: '#FF5733',
        imagem: pizza, 
      },
      {
        id: 2,
        name: 'Lanches',
        cor_hex: '#C70039',
        imagem: burger,
      },
      {
        id: 3,
        name: 'Marmitas',
        cor_hex: '#FFC300',
        imagem: marmita,
      },
      {
        id: 4,
        name: 'Doces',
        cor_hex: '#900C3F',
        imagem: doce, 
      },
      {
        id: 5,
        name: 'Bebidas',
        cor_hex: '#581845',
        imagem: refri, 
      },
];