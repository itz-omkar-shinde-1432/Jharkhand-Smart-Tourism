import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

interface DestinationCardProps {
  title: string;
  location: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  onViewAR?: () => void;
}

const DestinationCard = ({
  title,
  location,
  description,
  image,
  category,
  rating,
  onViewAR,
}: DestinationCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 text-primary-foreground">
            {category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{location}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <Button
          variant="ghost"
          className="group/btn h-auto p-0 font-medium text-primary hover:text-primary-hover"
          onClick={onViewAR}
        >
          View AR Preview
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;