
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Settings, LogOut, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const WalmartNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              WalSync
            </h1>
            <p className="text-sm text-gray-500">
              Procurement & Compliance Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/*<div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search suppliers..." className="pl-10 w-64" />
          </div>*/}

          <div className="flex space-x-2">
            <Badge className="bg-green-100 text-green-800">142 Low Risk</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">
              23 Medium Risk
            </Badge>
            <Badge className="bg-red-100 text-red-800">7 High Risk</Badge>
          </div>
          {/*
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            J. Smith
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>*/}

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default WalmartNavbar;
