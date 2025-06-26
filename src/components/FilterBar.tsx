
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
}

const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
}: FilterBarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Business', 'Data Science'];
  const priceOptions = ['All', 'Free', 'Paid'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Category Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-48 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {selectedCategory}
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        onCategoryChange(category);
                        setIsCategoryOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        selectedCategory === category ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <div className="flex gap-2">
              {priceOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onPriceFilterChange(option)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    priceFilter === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Filters:</span>
          <span className="ml-2">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mr-2">
                {selectedCategory}
              </span>
            )}
            {priceFilter !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {priceFilter}
              </span>
            )}
            {selectedCategory === 'All' && priceFilter === 'All' && (
              <span className="text-gray-500">None</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
