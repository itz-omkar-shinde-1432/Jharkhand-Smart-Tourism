import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, Music, Palette, Scissors, Shirt } from "lucide-react";

const LocalMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Products", icon: ShoppingBag },
    { id: "instruments", name: "Musical Instruments", icon: Music },
    { id: "handicrafts", name: "Handicrafts", icon: Palette },
    { id: "art", name: "Tribal Art", icon: Scissors },
    { id: "textiles", name: "Textiles", icon: Shirt }
  ];

  const products = [
    {
      id: 1,
      name: "Mandar (Traditional Drum)",
      description: "Authentic tribal drum used in Santhali folk dances and ceremonies",
      image: "/api/placeholder/300/200",
      category: "instruments",
      price: "₹1,500 - ₹3,000",
      availability: "Handicraft Centers"
    },
    {
      id: 2,
      name: "Nagara Drums",
      description: "Traditional percussion instrument made from goatskin and wood",
      image: "/api/placeholder/300/200",
      category: "instruments", 
      price: "₹2,000 - ₹5,000",
      availability: "Local Artisans"
    },
    {
      id: 3,
      name: "Bamboo Flute (Bansuri)",
      description: "Handcrafted bamboo flutes from Jharkhand's bamboo forests",
      image: "/api/placeholder/300/200",
      category: "instruments",
      price: "₹300 - ₹800",
      availability: "Village Markets"
    },
    {
      id: 4,
      name: "Sohrai Paintings",
      description: "Traditional wall art depicting nature and mythology in vibrant colors",
      image: "/api/placeholder/300/200",
      category: "art",
      price: "₹500 - ₹2,500",
      availability: "Art Galleries"
    },
    {
      id: 5,
      name: "Dokra Metal Craft",
      description: "Ancient lost-wax casting technique creating beautiful metal figurines",
      image: "/api/placeholder/300/200",
      category: "handicrafts",
      price: "₹800 - ₹4,000",
      availability: "Craft Centers"
    },
    {
      id: 6,
      name: "Tribal Jewelry",
      description: "Traditional silver and brass ornaments worn by tribal communities",
      image: "/api/placeholder/300/200",
      category: "handicrafts",
      price: "₹1,000 - ₹6,000",
      availability: "Local Markets"
    },
    {
      id: 7,
      name: "Gamcha Cloth",
      description: "Traditional checked cotton towel used in daily life and ceremonies",
      image: "/api/placeholder/300/200",
      category: "textiles",
      price: "₹200 - ₹500",
      availability: "Local Weavers"
    },
    {
      id: 8,
      name: "Tussar Silk Sarees",
      description: "Elegant silk sarees with tribal motifs and natural dyeing",
      image: "/api/placeholder/300/200",
      category: "textiles",
      price: "₹3,000 - ₹8,000",
      availability: "Silk Centers"
    }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-r from-secondary/5 via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 btn-enhanced">
            <ShoppingBag className="h-3 w-3 mr-1" />
            Cultural Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Local <span className="text-gradient">Marketplace</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover and support authentic Jharkhand handicrafts, traditional musical instruments, 
            and tribal art created by local artisans.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2 btn-enhanced"
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group card-hover overflow-hidden">
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="h-16 w-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                </div>
                <Badge className="absolute top-3 left-3 bg-primary/90 text-white capitalize">
                  {categories.find(c => c.id === product.category)?.name || product.category}
                </Badge>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">Price Range:</span>
                    <span className="text-sm font-semibold">{product.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">Available At:</span>
                    <span className="text-sm">{product.availability}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 btn-enhanced">
                    Learn More
                  </Button>
                  <Button size="sm" className="flex-1 gap-1 btn-enhanced btn-glow">
                    <ExternalLink className="h-3 w-3" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Support local artisans and preserve Jharkhand's cultural heritage
          </p>
          <Button variant="outline" size="lg" className="gap-2 btn-enhanced">
            <ShoppingBag className="h-4 w-4" />
            Visit All Markets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalMarketplace;