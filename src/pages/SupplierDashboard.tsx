
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, AlertTriangle, TrendingUp, Target, Award } from "lucide-react";
import SupplierNavbar from "@/components/SupplierNavbar";
import DocumentUpload from "@/components/DocumentUpload";
import { esgCategories } from "@/data/mockData";

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const overallScore = 78;
  const categoryScores = {
    carbonEmissions: 88,
    renewableEnergy: 82,
    wasteManagement: 90,
    waterStewardship: 85,
    sustainableSourcing: 87,
    laborPractices: 92,
    environmentalCompliance: 89,
    packagingSustainability: 83,
    transparency: 78,
    certifications: 95
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low', color: 'text-green-700 bg-green-100' };
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-700 bg-yellow-100' };
    return { level: 'High', color: 'text-red-700 bg-red-100' };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black">
      <SupplierNavbar />

      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-glow animate-glow mb-2">
            ESG Compliance Dashboard
          </h1>
          <p className="text-lg text-white drop-shadow-glow">
            Track your environmental, social, and governance performance
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-2 border-l-4 border-l-green-500 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-green-400 font-extrabold drop-shadow-glow animate-glow">
                    Overall ESG Score
                  </CardTitle>
                  <CardDescription className="text-white drop-shadow-glow">
                    Your current compliance rating
                  </CardDescription>
                </div>
                <div className="text-4xl font-bold text-green-300 drop-shadow-glow animate-glow">
                  {overallScore}/100
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={overallScore} className="h-3 mb-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white drop-shadow-glow">Performance Level</span>
                <Badge className={getRiskLevel(overallScore).color + ' font-bold drop-shadow-glow'}>
                  {getRiskLevel(overallScore).level} Risk
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-blue-400 font-bold drop-shadow-glow animate-glow">
                <Award className="h-5 w-5 mr-2 text-blue-400 drop-shadow-glow animate-glow" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-start text-white font-bold drop-shadow-glow">ISO 14001</Badge>
                <Badge variant="outline" className="w-full justify-start text-white font-bold drop-shadow-glow">SA8000</Badge>
                <Badge variant="outline" className="w-full justify-start text-white font-bold drop-shadow-glow">Fair Trade</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-green-400 font-bold drop-shadow-glow animate-glow">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400 drop-shadow-glow animate-glow" />
                Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-300 mb-1 drop-shadow-glow animate-glow">+12</div>
              <p className="text-sm text-white drop-shadow-glow">Points gained this quarter</p>
              <div className="text-xs text-white/80 mt-2 drop-shadow-glow">Target: 85 by Q2 2024</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Category Overview</TabsTrigger>
            <TabsTrigger value="upload">Document Upload</TabsTrigger>
            <TabsTrigger value="guidance">Improvement Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {esgCategories.map((category) => {
                const score = categoryScores[category.id as keyof typeof categoryScores];
                const risk = getRiskLevel(score);

                return (
                  <Card
                    key={category.id}
                    className="bg-black/80 shadow-lg drop-shadow-glow animate-glow hover:shadow-2xl transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white font-bold drop-shadow-glow animate-glow">
                          {category.name}
                        </CardTitle>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold drop-shadow-glow animate-glow ${getScoreColor(score)}`}
                          >
                            {score}/100
                          </div>
                          <Badge className={risk.color + ' font-bold drop-shadow-glow'} variant="secondary">
                            {risk.level}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-white/80 drop-shadow-glow animate-glow">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress value={score} className="mb-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80 drop-shadow-glow">
                          {category.requiredDocuments.length} documents required
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="guidance" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-blue-400 font-bold drop-shadow-glow animate-glow">
                    <Target className="h-6 w-6 mr-2 text-blue-400 drop-shadow-glow animate-glow" />
                    Priority Improvements
                  </CardTitle>
                  <CardDescription className="text-white drop-shadow-glow animate-glow">
                    Focus on these areas to maximize your ESG score improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-yellow-500 pl-4">
                      <h3 className="font-semibold text-white drop-shadow-glow animate-glow">
                        Renewable Energy Usage
                      </h3>
                      <p className="text-white/80 text-sm mb-2 drop-shadow-glow">
                        Current: 82/100 • Target: 90/100
                      </p>
                      <p className="text-white/80 drop-shadow-glow">
                        Consider installing solar panels or purchasing additional renewable energy certificates to increase your clean energy percentage.
                      </p>
                    </div>

                    <div className="border-l-4 border-l-yellow-500 pl-4">
                      <h3 className="font-semibold text-white drop-shadow-glow animate-glow">
                        Transparency & Reporting
                      </h3>
                      <p className="text-white/80 text-sm mb-2 drop-shadow-glow">
                        Current: 78/100 • Target: 85/100
                      </p>
                      <p className="text-white/80 drop-shadow-glow">
                        Publish an annual sustainability report and participate more actively in Walmart's Project Gigaton reporting platform.
                      </p>
                    </div>

                    <div className="border-l-4 border-l-blue-500 pl-4">
                      <h3 className="font-semibold text-white drop-shadow-glow animate-glow">
                        Packaging Sustainability
                      </h3>
                      <p className="text-white/80 text-sm mb-2 drop-shadow-glow">
                        Current: 83/100 • Target: 90/100
                      </p>
                      <p className="text-white/80 drop-shadow-glow">
                        Transition to 100% recyclable packaging materials and reduce overall packaging volume by 15% through design optimization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white font-bold drop-shadow-glow animate-glow">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-green-400 drop-shadow-glow animate-glow">Quick Wins (30 days)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Submit missing water usage reports</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Update labor audit documentation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Obtain ISO 50001 certification</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-blue-400 drop-shadow-glow animate-glow">Long-term Goals (90 days)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Implement renewable energy project</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Redesign packaging for sustainability</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                          <span className="text-white drop-shadow-glow">Establish waste reduction program</span>
                        </li>
                      </ul>
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

export default SupplierDashboard;
