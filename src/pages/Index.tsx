
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Globe, Users, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900  dark:text-white mb-2">
                Walmart
              </h1>
              <p className="text-sm text-gray-600">Risk Compass System</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link to="/supplier/login">
              <Button variant="outline" className="hover:bg-blue-50">
                Supplier Portal
              </Button>
            </Link>
            <Link to="/walmart/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Walmart Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900  dark:text-white mb-2 mb-6">
            AI-Driven Supplier Risk &
            <span className="text-blue-600"> Compliance Platform</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-white mb-2 leading-relaxed">
            Comprehensive ESG risk management with real-time monitoring,
            AI-powered analysis, and automated compliance scoring for
            sustainable supply chains.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/supplier/login">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-8 py-3"
              >
                <Users className="mr-2 h-5 w-5" />
                Supplier Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/walmart/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-full w-fit">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Real-Time Risk Monitoring
              </CardTitle>
              <CardDescription>
                Continuous monitoring of supplier ESG compliance with AI-powered
                risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Carbon emissions tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Labor compliance monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Environmental regulation alerts
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Interactive Heat Maps</CardTitle>
              <CardDescription>
                Visual representation of supplier risk levels across
                geographical regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Geographic risk visualization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Color-coded risk levels
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Drill-down capabilities
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-full w-fit">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">AI-Powered Analytics</CardTitle>
              <CardDescription>
                Advanced machine learning algorithms for predictive risk
                analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Predictive risk scoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Trend analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Automated recommendations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ESG Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive ESG Tracking
            </h3>
            <p className="text-lg text-gray-600">
              Monitor 10 critical compliance categories
            </p>
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
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-bold">Walmart Risk Compass</h4>
          </div>
          <p className="text-gray-400">
            Powered by AI • Secured by Design • Built for Scale
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
