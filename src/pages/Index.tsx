import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, MapPin, Users, Mountain, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import { useToast } from "@/hooks/use-toast";

// Import images
import jharkhandHero from "@/assets/jharkhand-hero.jpg";
import netarhatHill from "@/assets/netarhat-hill-station.jpg";
import dassamFalls from "@/assets/dassam-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import tribalCulture from "@/assets/tribal-culture.jpg";

const Index = () => {
  const { toast } = useToast();

  const destinations = [
    {
      title: "Netarhat Hill Station",
      location: "Latehar District",
      description: "Queen of Chotanagpur plateau with stunning sunrise and sunset views",
      image: netarhatHill,
      category: "Hill Station",
      rating: 4.7,
    },
    {
      title: "Dassam Falls",
      location: "Ranchi District", 
      description: "Spectacular 144-feet waterfall surrounded by dense forests",
      image: dassamFalls,
      category: "Waterfall",
      rating: 4.5,
    },
    {
      title: "Betla National Park",
      location: "Palamu District",
      description: "Tiger reserve with diverse wildlife and ancient fort ruins", 
      image: betlaPark,
      category: "Wildlife",
      rating: 4.5,
    },
  ];

  const handleARPreview = (title: string) => {
    toast({
      title: "AR Preview",
      description: `Opening AR preview for ${title}. Feature coming soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={jharkhandHero}
            alt="Beautiful landscape of Jharkhand with lush forests and tribal heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            <MapPin className="h-3 w-3 mr-1" />
            Discover Jharkhand
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Smart
            <span className="block text-secondary">Jharkhand Tourism</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Explore the untamed beauty of Jharkhand - from majestic waterfalls to vibrant tribal culture, 
            discover experiences that connect you with nature's heartbeat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/itinerary-planner">
              <Button size="lg" className="gap-2 text-lg px-8 py-3">
                Plan Your Trip
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Play className="h-5 w-5" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24+</div>
              <p className="text-muted-foreground">Districts</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <p className="text-muted-foreground">Destinations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">32</div>
              <p className="text-muted-foreground">Tribal Groups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Token CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Coins className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-primary">Green Token Rewards</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Participate in eco-cleanup activities and earn Virtual Cash! 
                Help keep Jharkhand's beautiful destinations clean and get rewarded.
              </p>
              <Link to="/green-tokens">
                <Button size="lg" className="gap-2">
                  <Coins className="h-5 w-5" />
                  Start Earning Tokens
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">
              <Mountain className="h-3 w-3 mr-1" />
              Featured Spots
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Amazing
              <span className="text-primary">Tourist Destinations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience Jharkhand's most captivating locations with immersive AR/VR previews 
              and detailed information about each destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={index}
                {...destination}
                onViewAR={() => handleARPreview(destination.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">
                <Users className="h-3 w-3 mr-1" />
                Cultural Heritage
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rich Tribal <span className="text-primary">Culture & Traditions</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Immerse yourself in the vibrant culture of Jharkhand's 32 tribal communities. 
                Experience traditional dances, handicrafts, and age-old customs that have been 
                preserved for generations.
              </p>
              <Link to="/culture">
                <Button className="gap-2">
                  Explore Culture
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={tribalCulture}
                alt="Jharkhand tribal culture with traditional dance and costumes"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
