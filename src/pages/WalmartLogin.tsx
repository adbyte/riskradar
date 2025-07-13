import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, BarChart3, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WalmartLogin = () => {
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
          description: "Welcome to WalSync!",
        });
        navigate("/walmart/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Walmart Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor supplier risk and compliance
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
              Welcome Back!
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              Sign in to view supplier analytics, risk maps, and compliance
              reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">
                 Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="employee@walmart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Access Dashboard"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demo credentials: walmart@demo.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <BarChart3 className="h-4 w-4" />
            <span>Secure access to Risk Compass analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalmartLogin;
