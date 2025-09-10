import Header from "@/components/Header";
import VirtualCashSystem from "@/components/VirtualCashSystem";

const GreenTokens = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-8">
        <VirtualCashSystem />
      </div>
    </div>
  );
};

export default GreenTokens;