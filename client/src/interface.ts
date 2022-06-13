export interface Product {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
}

export interface Query {
  page?: number;
  sort: string;
  caches?: any;
  isRefetching?: boolean;
  setIsRefetching?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DataResponse {
  products: Product[];
  count: number;
}
