import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface DestinationSearchProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  selectedCategory: string;
}

const DestinationSearch = ({ onSearch, onFilter, selectedCategory }: DestinationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { id: "all", name: "All" },
    { id: "waterfall", name: "Waterfalls" },
    { id: "hill-station", name: "Hill Stations" },
    { id: "wildlife", name: "Wildlife" },
    { id: "temple", name: "Temples" },
    { id: "cultural", name: "Cultural Sites" }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations (e.g., Netarhat, Dassam Falls...)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Button */}
        <Button variant="outline" className="gap-2 whitespace-nowrap">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => onFilter(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default DestinationSearch;