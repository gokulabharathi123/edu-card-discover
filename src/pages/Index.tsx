import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';
import { Course } from '../types/Course';

const Index = () => {
  const [courses] = useState<Course[]>([
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
    {
      id: 2,
      title: "The Complete 2024 Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.6,
      reviewCount: 267894,
      price: 0,
      category: "Development",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      enrollmentCount: 634821
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass: Adobe XD & Figma",
      instructor: "Daniel Scott",
      rating: 4.8,
      reviewCount: 45672,
      price: 64.99,
      originalPrice: 149.99,
      category: "Design",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      badge: "Hot",
      enrollmentCount: 123456
    },
    {
      id: 4,
      title: "Digital Marketing Complete Course - 23 Courses in 1",
      instructor: "Robin & Jesper",
      rating: 4.4,
      reviewCount: 89234,
      price: 79.99,
      originalPrice: 189.99,
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      enrollmentCount: 267891
    },
    {
      id: 5,
      title: "Python for Data Science and Machine Learning",
      instructor: "Jose Marcial Portilla",
      rating: 4.6,
      reviewCount: 156789,
      price: 0,
      category: "Development",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      enrollmentCount: 445672
    },
    {
      id: 6,
      title: "Graphic Design Masterclass - Adobe Photoshop & Illustrator",
      instructor: "Lindsay Marsh",
      rating: 4.5,
      reviewCount: 78945,
      price: 54.99,
      originalPrice: 124.99,
      category: "Design",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      badge: "New",
      enrollmentCount: 98765
    }
  ]);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<string>('All');

  useEffect(() => {
    let filtered = courses;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Price filter
    if (priceFilter === 'Free') {
      filtered = filtered.filter(course => course.price === 0);
    } else if (priceFilter === 'Paid') {
      filtered = filtered.filter(course => course.price > 0);
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, priceFilter, courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Courses</h1>
          <p className="text-xl text-gray-600 mb-6">Learn from top instructors and advance your skills</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>{filteredCourses.length} courses found</span>
            <span>•</span>
            <span>All prices in Indian Rupees (₹)</span>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
        />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredCourses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more courses.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
