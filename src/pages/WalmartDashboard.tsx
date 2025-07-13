
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black">
      <WalmartNavbar />

      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-glow animate-glow mb-2">
              Supplier Risk Analytics
            </h1>
            <p className="text-lg text-white drop-shadow-glow">
              Monitor ESG compliance across your global supplier network
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={viewMode}
              onValueChange={(value: "map" | "table") => setViewMode(value)}
            >
              <SelectTrigger className="w-40 font-bold drop-shadow-glow animate-glow bg-black text-white border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black text-white font-bold drop-shadow-glow animate-glow">
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
              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-blue-300 drop-shadow-glow animate-glow">Total Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-white drop-shadow-glow animate-glow">{totalSuppliers}</div>
                  <div className="flex items-center text-sm text-blue-200 mt-1 drop-shadow-glow animate-glow">
                    <Users className="h-4 w-4 mr-1 text-blue-300 drop-shadow-glow animate-glow" />Active partnerships
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-400 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-green-300 drop-shadow-glow animate-glow">Low Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-green-200 drop-shadow-glow animate-glow">{lowRiskSuppliers}</div>
                  <div className="flex items-center text-sm text-green-200 mt-1 drop-shadow-glow animate-glow">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-300 drop-shadow-glow animate-glow" />+{riskTrends.low.change} this month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-400 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-yellow-300 drop-shadow-glow animate-glow">Medium Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-yellow-200 drop-shadow-glow animate-glow">{mediumRiskSuppliers}</div>
                  <div className="flex items-center text-sm text-yellow-200 mt-1 drop-shadow-glow animate-glow">
                    <TrendingUp className="h-4 w-4 mr-1 text-yellow-300 drop-shadow-glow animate-glow" />+{riskTrends.medium.change} this month
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-400 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-red-300 drop-shadow-glow animate-glow">High Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-red-200 drop-shadow-glow animate-glow">{highRiskSuppliers}</div>
                  <div className="flex items-center text-sm text-red-200 mt-1 drop-shadow-glow animate-glow">
                    <TrendingDown className="h-4 w-4 mr-1 text-red-300 drop-shadow-glow animate-glow" />-{Math.abs(riskTrends.high.change)} this month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold text-blue-300 drop-shadow-glow animate-glow">Avg. ESG Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-extrabold text-blue-200 drop-shadow-glow animate-glow">{averageScore}</div>
                  <div className="flex items-center text-sm text-blue-200 mt-1 drop-shadow-glow animate-glow">
                    <TrendingUp className="h-4 w-4 mr-1 text-blue-300 drop-shadow-glow animate-glow" />+3.2 vs last quarter
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="mb-8 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-300 font-bold drop-shadow-glow animate-glow">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-300 drop-shadow-glow animate-glow" />
                  Recent Risk Alerts
                </CardTitle>
                <CardDescription className="text-white/80 drop-shadow-glow animate-glow">
                  High-priority compliance issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-900/80 border border-red-400 rounded-lg shadow drop-shadow-glow animate-glow">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                        <AlertTriangle className="h-4 w-4 text-red-300 drop-shadow-glow animate-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-200 drop-shadow-glow animate-glow">Environmental Violation</h3>
                        <p className="text-sm text-red-300 drop-shadow-glow animate-glow">Bangalore Electronics Corp - Exceeded emission limits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-700 text-red-200 font-bold drop-shadow-glow animate-glow">High Risk</Badge>
                      <p className="text-xs text-red-300 mt-1 drop-shadow-glow animate-glow">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-900/80 border border-yellow-400 rounded-lg shadow drop-shadow-glow animate-glow">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                        <AlertTriangle className="h-4 w-4 text-yellow-300 drop-shadow-glow animate-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-yellow-200 drop-shadow-glow animate-glow">Labor Compliance Issue</h3>
                        <p className="text-sm text-yellow-300 drop-shadow-glow animate-glow">Delhi Textiles - Overtime hours exceeded limits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-700 text-yellow-200 font-bold drop-shadow-glow animate-glow">Medium Risk</Badge>
                      <p className="text-xs text-yellow-300 mt-1 drop-shadow-glow animate-glow">5 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-900/80 border border-orange-400 rounded-lg shadow drop-shadow-glow animate-glow">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                        <Calendar className="h-4 w-4 text-orange-300 drop-shadow-glow animate-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-200 drop-shadow-glow animate-glow">Audit Overdue</h3>
                        <p className="text-sm text-orange-300 drop-shadow-glow animate-glow">Kolkata Steel Works - Annual audit due in 7 days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-orange-700 text-orange-200 font-bold drop-shadow-glow animate-glow">Action Required</Badge>
                      <p className="text-xs text-orange-300 mt-1 drop-shadow-glow animate-glow">1 week remaining</p>
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
              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-300 drop-shadow-glow animate-glow">Risk Distribution Trends</CardTitle>
                  <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Changes in supplier risk levels over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-red-300 drop-shadow-glow animate-glow">High Risk Suppliers</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-red-700 px-2 py-1 rounded text-sm text-red-200 font-bold drop-shadow-glow animate-glow">-{Math.abs(riskTrends.high.change)} suppliers</div>
                        <TrendingDown className="h-4 w-4 text-red-300 drop-shadow-glow animate-glow" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-yellow-300 drop-shadow-glow animate-glow">Medium Risk Suppliers</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-yellow-700 px-2 py-1 rounded text-sm text-yellow-200 font-bold drop-shadow-glow animate-glow">+{riskTrends.medium.change} supplier</div>
                        <TrendingUp className="h-4 w-4 text-yellow-300 drop-shadow-glow animate-glow" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-300 drop-shadow-glow animate-glow">Low Risk Suppliers</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-green-700 px-2 py-1 rounded text-sm text-green-200 font-bold drop-shadow-glow animate-glow">+{riskTrends.low.change} supplier</div>
                        <TrendingUp className="h-4 w-4 text-green-300 drop-shadow-glow animate-glow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-300 drop-shadow-glow animate-glow">Regional Risk Assessment</CardTitle>
                  <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Risk concentration by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white drop-shadow-glow animate-glow">Maharashtra</span>
                      <Badge className="bg-green-700 text-green-200 font-bold drop-shadow-glow animate-glow">Low Risk</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white drop-shadow-glow animate-glow">Tamil Nadu</span>
                      <Badge className="bg-green-700 text-green-200 font-bold drop-shadow-glow animate-glow">Low Risk</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white drop-shadow-glow animate-glow">Delhi</span>
                      <Badge className="bg-yellow-700 text-yellow-200 font-bold drop-shadow-glow animate-glow">Medium Risk</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white drop-shadow-glow animate-glow">West Bengal</span>
                      <Badge className="bg-yellow-700 text-yellow-200 font-bold drop-shadow-glow animate-glow">Medium Risk</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white drop-shadow-glow animate-glow">Karnataka</span>
                      <Badge className="bg-red-700 text-red-200 font-bold drop-shadow-glow animate-glow">High Risk</Badge>
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
