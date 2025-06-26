
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Clock, PlayCircle, CheckCircle } from 'lucide-react';
import { Course } from '../types/Course';

// Sample course data (in a real app, this would come from an API)
const courseData: Course[] = [
  {
    id: 1,
    title: "Complete JavaScript Course 2024: From Zero to Expert!",
    instructor: "Jonas Schmedtmann",
    rating: 4.7,
    reviewCount: 184563,
    price: 84.99,
    originalPrice: 199.99,
    category: "Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    badge: "Best Seller",
    enrollmentCount: 847392
  },
  // Add more courses as needed
];

const CourseDetails = () => {
  const { id } = useParams();
  const course = courseData.find(c => c.id === parseInt(id || '1'));

  if (!course) {
    return <div>Course not found</div>;
  }

  const priceInINR = (course.price * 83).toFixed(0); // Convert USD to INR
  const originalPriceInINR = course.originalPrice ? (course.originalPrice * 83).toFixed(0) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                    <p className="text-gray-600 mb-2">by {course.instructor}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                        <span className="ml-1">({course.reviewCount.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{course.enrollmentCount.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Description</h2>
                <p className="text-gray-600 mb-4">
                  Master JavaScript with the most complete course! Projects, challenges, final exam, ES2024+ and many real-world examples. All skill levels welcome.
                </p>
                <p className="text-gray-600">
                  This course includes everything you need to learn modern JavaScript from scratch. We'll cover ES6+, asynchronous JavaScript, Object-Oriented Programming, and much more.
                </p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Master JavaScript fundamentals",
                    "Build real-world projects",
                    "Understand ES6+ features",
                    "Learn asynchronous programming",
                    "Master DOM manipulation",
                    "Work with APIs and AJAX"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white shadow-lg sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">₹{priceInINR}</span>
                    {originalPriceInINR && (
                      <span className="text-lg text-gray-500 line-through">₹{originalPriceInINR}</span>
                    )}
                  </div>
                  {originalPriceInINR && (
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {Math.round((1 - course.price / course.originalPrice!) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <Link to={`/payment/${course.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      Buy Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>52 hours</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lectures:</span>
                    <div className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-1" />
                      <span>319 lectures</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span>All Levels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span>Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
