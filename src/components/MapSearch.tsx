import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';

interface MapSearchProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (category: string) => void;
}

const MapSearch = ({ onSearchChange, onFilterChange }: MapSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce search requests to reduce API calls
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      onSearchChange(query);
    }, 500),
    [onSearchChange]
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search locations..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default MapSearch;