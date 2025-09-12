import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Leaf, Gift, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import greenTokenIcon from "@/assets/green-token-icon.png";

interface Transaction {
  id: string;
  code: string;
  amount: number;
  timestamp: Date;
  type: 'redeem' | 'earn';
}

// Predefined tokens for demo
const DEMO_TOKENS = {
  'CLEAN10': { value: 10, used: false },
  'CLEAN20': { value: 20, used: false },
  'CLEAN100': { value: 100, used: false },
  'ECO2024': { value: 50, used: false },
  'GREEN25': { value: 25, used: false },
} as const;

const VirtualCashSystem = () => {
  const [tokenCode, setTokenCode] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [usedTokens, setUsedTokens] = useState<Set<string>>(new Set());
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('virtualCashBalance');
    const savedTransactions = localStorage.getItem('virtualCashTransactions');
    const savedUsedTokens = localStorage.getItem('usedTokens');

    if (savedBalance) setBalance(parseInt(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedUsedTokens) setUsedTokens(new Set(JSON.parse(savedUsedTokens)));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('virtualCashBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('virtualCashTransactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('usedTokens', JSON.stringify([...usedTokens]));
  }, [usedTokens]);

  const redeemToken = async () => {
    if (!tokenCode.trim()) {
      toast({
        title: "Invalid Token",
        description: "Please enter a token code",
        variant: "destructive",
      });
      return;
    }

    const upperCode = tokenCode.toUpperCase().trim();

    if (usedTokens.has(upperCode)) {
      toast({
        title: "Token Already Used",
        description: "This token has already been redeemed",
        variant: "destructive",
      });
      return;
    }

    if (!(upperCode in DEMO_TOKENS)) {
      toast({
        title: "Invalid Token",
        description: "This token code is not valid",
        variant: "destructive",
      });
      return;
    }

    setIsRedeeming(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const tokenValue = DEMO_TOKENS[upperCode as keyof typeof DEMO_TOKENS].value;
    const newBalance = balance + tokenValue;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      code: upperCode,
      amount: tokenValue,
      timestamp: new Date(),
      type: 'redeem',
    };

    // Update balance and localStorage
    const oldBalance = balance;
    setBalance(newBalance);
    localStorage.setItem('virtualCashBalance', newBalance.toString());
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('balanceUpdated', {
      detail: { newBalance, oldBalance }
    }));
    
    setTransactions(prev => [newTransaction, ...prev]);
    setUsedTokens(prev => new Set([...prev, upperCode]));
    setTokenCode("");
    setIsRedeeming(false);

    toast({
      title: "Token Redeemed Successfully!",
      description: `Added ${tokenValue} Green Tokens to your balance`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <img src={greenTokenIcon} alt="Green Token" className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-primary">Virtual Cash System</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Earn Green Tokens by participating in eco-friendly activities and cleaning initiatives. 
          Redeem tokens you receive from vendors after environmental cleanup activities.
        </p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Coins className="h-6 w-6 text-primary" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">{balance}</div>
          <p className="text-sm text-muted-foreground">Green Tokens</p>
        </CardContent>
      </Card>

      {/* Redeem Token Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Redeem Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter token code (e.g., CLEAN10)"
              value={tokenCode}
              onChange={(e) => setTokenCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && redeemToken()}
              className="flex-1"
            />
            <Button 
              onClick={redeemToken} 
              disabled={isRedeeming}
              className="min-w-[100px]"
            >
              {isRedeeming ? "Redeeming..." : "Redeem"}
            </Button>
          </div>
          
          {/* Demo tokens info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              Demo Token Codes (for testing):
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(DEMO_TOKENS).map(([code, { value }]) => (
                <Badge 
                  key={code} 
                  variant={usedTokens.has(code) ? "secondary" : "default"}
                  className="text-xs"
                >
                  {code} (+{value})
                  {usedTokens.has(code) && " ✓"}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No transactions yet. Redeem your first token above!
            </p>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Token: {transaction.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.timestamp.toLocaleDateString()} at{" "}
                      {transaction.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">Green Tokens</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualCashSystem;