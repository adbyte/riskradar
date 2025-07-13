
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Building2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SupplierLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to your supplier dashboard!",
        });
        navigate("/supplier/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-white font-bold drop-shadow-glow hover:text-gray-300 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-white drop-shadow-glow" />
            Back to Home
          </Link>
          <div className="bg-black p-3 rounded-full w-fit mx-auto mb-4 shadow-lg shadow-white/30 animate-pulse">
            <Building2 className="h-8 w-8 text-white drop-shadow-glow" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-300 to-white bg-clip-text text-transparent drop-shadow-glow animate-glow">Supplier Portal</h1>
          <p className="text-white drop-shadow-glow">Access your ESG compliance dashboard</p>
        </div>

        <Card className="shadow-2xl border-2 border-blue-500 bg-gradient-to-br from-black via-blue-950 to-black/90 backdrop-blur-lg drop-shadow-glow animate-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-glow animate-glow">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white drop-shadow-glow">
              Sign in to manage your compliance documentation and track your ESG score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-bold drop-shadow-glow">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="supplier@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-black text-white border border-white/30 placeholder-gray-400 drop-shadow-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-bold drop-shadow-glow">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-black text-white border border-white/30 placeholder-gray-400 drop-shadow-glow"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-white text-black font-bold shadow-lg shadow-white/30 drop-shadow-glow hover:bg-gray-200"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20 text-center">
              <p className="text-sm text-white drop-shadow-glow">
                Demo credentials: supplier@demo.com / password123
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-white drop-shadow-glow">
            Need help? Contact your Walmart procurement representative
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierLogin;
