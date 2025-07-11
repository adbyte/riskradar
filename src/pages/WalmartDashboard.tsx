
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, TrendingDown, TrendingUp, AlertTriangle, Users, FileText, Calendar } from "lucide-react";
import WalmartNavbar from "@/components/WalmartNavbar";
import SupplierHeatMap from "@/components/SupplierHeatMap";
import SupplierTable from "@/components/SupplierTable";
import SupplierDetail from "@/components/SupplierDetail";
import { mockSuppliers } from "@/data/mockData";

const WalmartDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');

  const totalSuppliers = mockSuppliers.length;
  const lowRiskSuppliers = mockSuppliers.filter(s => s.riskLevel === 'low').length;
  const mediumRiskSuppliers = mockSuppliers.filter(s => s.riskLevel === 'medium').length;
  const highRiskSuppliers = mockSuppliers.filter(s => s.riskLevel === 'high').length;
  const averageScore = Math.round(mockSuppliers.reduce((sum, s) => sum + s.esgScore, 0) / totalSuppliers);

  const riskTrends = {
    high: { current: highRiskSuppliers, change: -2, trend: 'down' },
    medium: { current: mediumRiskSuppliers, change: +1, trend: 'up' },
    low: { current: lowRiskSuppliers, change: +1, trend: 'up' }
  };

  if (selectedSupplier) {
    const supplier = mockSuppliers.find(s => s.id === selectedSupplier);
    if (supplier) {
      return (
        <div className="min-h-screen bg-gray-50">
          <WalmartNavbar />
          <SupplierDetail supplier={supplier} onBack={() => setSelectedSupplier(null)} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <WalmartNavbar />

      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Supplier Risk Analytics
            </h1>

            <p className="text-gray-600">
              Monitor ESG compliance across your global supplier network
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={viewMode}
              onValueChange={(value: "map" | "table") => setViewMode(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="map">Map View</SelectItem>
                <SelectItem value="table">Table View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="suppliers">Supplier Network</TabsTrigger>
            <TabsTrigger value="analytics">Trend Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">
                    {totalSuppliers}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    Active partnerships
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-green-700">
                    Low Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {lowRiskSuppliers}
                  </div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />+
                    {riskTrends.low.change} this month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-yellow-700">
                    Medium Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {mediumRiskSuppliers}
                  </div>
                  <div className="flex items-center text-sm text-yellow-600 mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />+
                    {riskTrends.medium.change} this month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-red-700">
                    High Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {highRiskSuppliers}
                  </div>
                  <div className="flex items-center text-sm text-red-600 mt-1">
                    <TrendingDown className="h-4 w-4 mr-1" />-
                    {Math.abs(riskTrends.high.change)} this month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg. ESG Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {averageScore}
                  </div>
                  <div className="flex items-center text-sm text-blue-600 mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +3.2 vs last quarter
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Recent Risk Alerts
                </CardTitle>
                <CardDescription>
                  High-priority compliance issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-900">
                          Environmental Violation
                        </h3>
                        <p className="text-sm text-red-700">
                          Bangalore Electronics Corp - Exceeded emission limits
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-100 text-red-800">
                        High Risk
                      </Badge>
                      <p className="text-xs text-red-600 mt-1">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-yellow-900">
                          Labor Compliance Issue
                        </h3>
                        <p className="text-sm text-yellow-700">
                          Delhi Textiles - Overtime hours exceeded limits
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Medium Risk
                      </Badge>
                      <p className="text-xs text-yellow-600 mt-1">5 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900">
                          Audit Overdue
                        </h3>
                        <p className="text-sm text-orange-700">
                          Kolkata Steel Works - Annual audit due in 7 days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-orange-100 text-orange-800">
                        Action Required
                      </Badge>
                      <p className="text-xs text-orange-600 mt-1">
                        1 week remaining
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            {viewMode === "map" ? (
              <SupplierHeatMap
                suppliers={mockSuppliers}
                onSupplierSelect={setSelectedSupplier}
              />
            ) : (
              <SupplierTable
                suppliers={mockSuppliers}
                onSupplierSelect={setSelectedSupplier}
              />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution Trends</CardTitle>
                  <CardDescription>
                    Changes in supplier risk levels over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        High Risk Suppliers
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-red-100 px-2 py-1 rounded text-sm text-red-700">
                          -{Math.abs(riskTrends.high.change)} suppliers
                        </div>
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Medium Risk Suppliers
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-yellow-100 px-2 py-1 rounded text-sm text-yellow-700">
                          +{riskTrends.medium.change} supplier
                        </div>
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Low Risk Suppliers
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-green-100 px-2 py-1 rounded text-sm text-green-700">
                          +{riskTrends.low.change} supplier
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Risk Assessment</CardTitle>
                  <CardDescription>
                    Risk concentration by geographic region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Maharashtra</span>
                      <Badge className="bg-green-100 text-green-800">
                        Low Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tamil Nadu</span>
                      <Badge className="bg-green-100 text-green-800">
                        Low Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Delhi</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Medium Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">West Bengal</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Medium Risk
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Karnataka</span>
                      <Badge className="bg-red-100 text-red-800">
                        High Risk
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WalmartDashboard;
