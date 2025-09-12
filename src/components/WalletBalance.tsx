import { useState, useEffect } from "react";
import { Wallet, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);

  useEffect(() => {
    // Get balance from localStorage
    const savedBalance = localStorage.getItem('virtualCashBalance');
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    }

    // Listen for balance updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'virtualCashBalance') {
        const newBalance = parseInt(e.newValue || '0');
        const oldBalance = parseInt(e.oldValue || '0');
        
        setBalance(newBalance);
        
        // Show reward animation if balance increased
        if (newBalance > oldBalance) {
          setShowRewardAnimation(true);
          setTimeout(() => setShowRewardAnimation(false), 600);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleBalanceUpdate = ((e: CustomEvent) => {
      const { newBalance, oldBalance } = e.detail;
      setBalance(newBalance);
      
      if (newBalance > oldBalance) {
        setShowRewardAnimation(true);
        setTimeout(() => setShowRewardAnimation(false), 600);
      }
    }) as EventListener;

    window.addEventListener('balanceUpdated', handleBalanceUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    };
  }, []);

  return (
    <Badge 
      variant="outline" 
      className={`gap-2 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 transition-all ${
        showRewardAnimation ? 'reward-bounce' : ''
      }`}
    >
      <Wallet className="h-3 w-3" />
      <span className="font-medium">₹{balance.toLocaleString()}</span>
      {showRewardAnimation && (
        <Coins className="h-3 w-3 animate-spin text-secondary" />
      )}
    </Badge>
  );
};

export default WalletBalance;