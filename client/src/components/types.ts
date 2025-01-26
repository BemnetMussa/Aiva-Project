export interface PropertyCardProps {
  imageUrl: string;
  heartIconUrl: string;
  shareIconUrl: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rating: number;
  pricePerNight: number;
  bedroomIconUrl: string;
  bathroomIconUrl: string;
  squareFeetIconUrl: string;
  ratingIconUrl: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchFormProps {
  onSubmit: (data: SearchFormData) => void;
}

export interface SearchFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
}
