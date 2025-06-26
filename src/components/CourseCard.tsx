import { Star, Users } from 'lucide-react';
import { Course } from '../types/Course';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    const priceInINR = (price * 83).toFixed(0);
    return `₹${priceInINR}`;
  };

  const formatOriginalPrice = (price: number) => {
    const priceInINR = (price * 83).toFixed(0);
    return `₹${priceInINR}`;
  };

  const formatEnrollment = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
      {/* Course Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {course.badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded ${
            course.badge === 'Best Seller' 
              ? 'bg-orange-500 text-white' 
              : course.badge === 'Hot'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {course.badge}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-gray-900">{course.rating}</span>
          <div className="flex items-center gap-1">
            {renderStars(course.rating)}
          </div>
          <span className="text-xs text-gray-500">({course.reviewCount.toLocaleString()})</span>
        </div>

        {/* Enrollment Count */}
        <div className="flex items-center gap-1 mb-4">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {formatEnrollment(course.enrollmentCount)} students
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {formatPrice(course.price)}
            </span>
            {course.originalPrice && course.price > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatOriginalPrice(course.originalPrice)}
              </span>
            )}
          </div>
          {course.originalPrice && course.price > 0 && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
