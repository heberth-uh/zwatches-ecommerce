export interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
}

export interface ProductGridProps {
  products: Product[];
}
