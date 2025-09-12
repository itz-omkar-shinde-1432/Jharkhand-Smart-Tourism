import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VirtualCashSystem from "@/components/VirtualCashSystem";

const GreenTokens = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-8">
        <VirtualCashSystem />
      </div>
      <Footer />
    </div>
  );
};

export default GreenTokens;