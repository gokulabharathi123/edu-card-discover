
export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  enrollmentCount: number;
}
