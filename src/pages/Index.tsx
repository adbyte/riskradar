
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Globe, Users, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between drop-shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-400/80 animate-pulse">
              <Shield className="h-8 w-8 text-white drop-shadow-glow" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-glow animate-glow">WalSync</h1>
              <p className="text-lg text-blue-300 font-semibold drop-shadow-glow">See Everything. Trust Everything</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link to="/supplier/login">
              <Button variant="outline" className="border-2 border-green-400 text-green-400 hover:bg-green-600 hover:text-white shadow-lg shadow-green-400/80 animate-pulse">
                Supplier Portal
              </Button>
            </Link>
            <Link to="/walmart/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400 shadow-lg shadow-blue-400/80 animate-pulse">
                Walmart Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-extrabold text-white mb-6 drop-shadow-glow animate-glow">
            <span className="text-blue-400">Blockchain</span> Based Sustainability
            <span className="text-yellow-400 drop-shadow-glow"> Tracking and Management Platform </span>
          </h2>
          <p className="text-2xl text-white mb-6 leading-relaxed drop-shadow-glow animate-glow">
            Comprehensive ESG risk management with real-time monitoring,
            <span className="text-white"> AI-powered analysis </span>, and <span className="text-white">automated compliance scoring </span> for
            sustainable supply chains.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/supplier/login">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-700 px-8 py-3 text-white font-bold shadow-lg shadow-green-400/80 border-2 border-green-300 animate-pulse"
              >
                <Users className="mr-2 h-5 w-5 text-yellow-300 drop-shadow-glow" />
                Supplier Access
                <ArrowRight className="ml-2 h-4 w-4 text-yellow-300 drop-shadow-glow" />
              </Button>
            </Link>
            <Link to="/walmart/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white font-bold shadow-lg shadow-blue-400/80 animate-pulse"
              >
                <BarChart3 className="mr-2 h-5 w-5 text-pink-300 drop-shadow-glow" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-2xl transition-shadow border-l-8 border-l-blue-400 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 animate-glow shadow-blue-400/80">
            <CardHeader>
              <div className="bg-blue-400 p-3 rounded-full w-fit shadow-lg shadow-blue-300/80 animate-pulse">
                <Shield className="h-6 w-6 text-yellow-300 drop-shadow-glow" />
              </div>
              <CardTitle className="text-2xl text-white drop-shadow-glow animate-glow">Real-Time Risk Monitoring</CardTitle>
              <CardDescription className="text-blue-100 font-semibold drop-shadow-glow">Continuous monitoring of supplier ESG compliance with AI-powered risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-lg text-white">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Carbon emissions tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Labor compliance monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Environmental regulation alerts
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-shadow border-l-8 border-l-yellow-400 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 animate-glow shadow-yellow-400/80">
            <CardHeader>
              <div className="bg-yellow-400 p-3 rounded-full w-fit shadow-lg shadow-yellow-300/80 animate-pulse">
                <Globe className="h-6 w-6 text-blue-600 drop-shadow-glow" />
              </div>
              <CardTitle className="text-2xl text-white drop-shadow-glow animate-glow">Interactive Heat Maps</CardTitle>
              <CardDescription className="text-yellow-100 font-semibold drop-shadow-glow">Visual representation of supplier risk levels across geographical regions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-lg text-white">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-2 drop-shadow-glow" />
                  Geographic risk visualization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-2 drop-shadow-glow" />
                  Color-coded risk levels
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-2 drop-shadow-glow" />
                  Drill-down capabilities
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-shadow border-l-8 border-l-blue-400 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 animate-glow shadow-blue-400/80">
            <CardHeader>
              <div className="bg-blue-400 p-3 rounded-full w-fit shadow-lg shadow-blue-300/80 animate-pulse">
                <TrendingUp className="h-6 w-6 text-yellow-300 drop-shadow-glow" />
              </div>
              <CardTitle className="text-2xl text-white drop-shadow-glow animate-glow">AI-Powered Analytics</CardTitle>
              <CardDescription className="text-blue-100 font-semibold drop-shadow-glow">Advanced machine learning algorithms for predictive risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-lg text-white">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Predictive risk scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Trend analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-2 drop-shadow-glow" />
                  Automated recommendations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ESG Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-4">Comprehensive ESG Tracking</h3>
            <p className="text-2xl text-gray-600 font-semibold">Monitor 10 critical compliance categories</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Carbon Emissions & Energy",
              "Renewable Energy Use",
              "Waste Management",
              "Water Stewardship",
              "Sustainable Sourcing",
              "Ethical Labor Practices",
              "Environmental Regulations",
              "Packaging Sustainability",
              "Reporting & Transparency",
              "Third-Party Certifications",
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-900">{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white py-12 border-t-4 border-yellow-400 animate-glow">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-400/80 animate-pulse">
              <Shield className="h-6 w-6 text-white drop-shadow-glow" />
            </div>
            <h4 className="text-2xl font-extrabold text-white drop-shadow-glow animate-glow">WalSync</h4>
          </div>
          <p className="text-2xl font-bold text-white drop-shadow-glow animate-glow">
            Powered by AI • Secured by Blockchain • Built for Scale
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
