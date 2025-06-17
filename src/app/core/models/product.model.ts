export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  discount?: number;
  isInCart?: boolean;
  isOwned?: boolean;
} 