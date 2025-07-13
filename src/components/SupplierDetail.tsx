
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, FileText, AlertTriangle, Award, Calendar, TrendingUp, CheckCircle, X } from "lucide-react";
import { Supplier, esgCategories } from "@/data/mockData";

interface SupplierDetailProps {
  supplier: Supplier;
  onBack: () => void;
}

const SupplierDetail = ({ supplier, onBack }: SupplierDetailProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <X className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryName = (categoryId: string) => {
    return esgCategories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="min-h-screen w-full px-8 pt-10 pb-8 bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="text-blue-300 border-blue-400 font-bold drop-shadow-glow animate-glow">
            <ArrowLeft className="h-4 w-4 mr-2 text-blue-300 drop-shadow-glow animate-glow" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-glow animate-glow">{supplier.name}</h1>
            <div className="flex items-center text-blue-200 mt-1 drop-shadow-glow animate-glow">
              <MapPin className="h-4 w-4 mr-1 text-blue-300 drop-shadow-glow animate-glow" />
              {supplier.location.city}, {supplier.location.state}, {supplier.location.country}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-extrabold drop-shadow-glow animate-glow ${getScoreColor(supplier.esgScore)}`}>{supplier.esgScore}/100</div>
          <Badge className={getRiskColor(supplier.riskLevel) + ' font-bold drop-shadow-glow animate-glow'}>{supplier.riskLevel.toUpperCase()} RISK</Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-blue-300 drop-shadow-glow animate-glow">ESG Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-extrabold drop-shadow-glow animate-glow ${getScoreColor(supplier.esgScore)}`}>{supplier.esgScore}/100</div>
            <Progress value={supplier.esgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-red-300 drop-shadow-glow animate-glow">Risk Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-red-200 drop-shadow-glow animate-glow">{supplier.riskEvents.length}</div>
            <p className="text-sm text-red-200 mt-1 drop-shadow-glow animate-glow">Active alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-blue-300 drop-shadow-glow animate-glow">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-blue-200 drop-shadow-glow animate-glow">{supplier.certifications.length}</div>
            <p className="text-sm text-blue-200 mt-1 drop-shadow-glow animate-glow">Active certificates</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-green-300 drop-shadow-glow animate-glow">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-green-200 drop-shadow-glow animate-glow">{supplier.documents.length}</div>
            <p className="text-sm text-green-200 mt-1 drop-shadow-glow animate-glow">Uploaded files</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/80 shadow drop-shadow-glow animate-glow">
          <TabsTrigger value="categories" className="text-blue-300 font-bold drop-shadow-glow animate-glow">ESG Categories</TabsTrigger>
          <TabsTrigger value="documents" className="text-blue-300 font-bold drop-shadow-glow animate-glow">Documents</TabsTrigger>
          <TabsTrigger value="events" className="text-blue-300 font-bold drop-shadow-glow animate-glow">Risk Events</TabsTrigger>
          <TabsTrigger value="timeline" className="text-blue-300 font-bold drop-shadow-glow animate-glow">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid md:grid-cols-2 gap-6">
            {esgCategories.map((category) => {
              const score = supplier.categories[category.id as keyof typeof supplier.categories];
              return (
                <Card key={category.id} className="bg-black/80 shadow-lg drop-shadow-glow animate-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-blue-300 font-bold drop-shadow-glow animate-glow">{category.name}</CardTitle>
                      <div className={`text-xl font-extrabold drop-shadow-glow animate-glow ${getScoreColor(score)}`}>{score}/100</div>
                    </div>
                    <CardDescription className="text-white/80 drop-shadow-glow animate-glow">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={score} className="mb-3" />
                    <div className="text-sm text-white/80 drop-shadow-glow animate-glow">Performance: {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-300 font-bold drop-shadow-glow animate-glow">
                <FileText className="h-5 w-5 mr-2 text-blue-300 drop-shadow-glow animate-glow" />
                Uploaded Documents
              </CardTitle>
              <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Review submitted compliance documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplier.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-black/60 shadow drop-shadow-glow animate-glow">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-900 p-2 rounded shadow drop-shadow-glow animate-glow">
                        <FileText className="h-5 w-5 text-blue-300 drop-shadow-glow animate-glow" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white drop-shadow-glow animate-glow">{doc.name}</h3>
                        <p className="text-sm text-blue-200 drop-shadow-glow animate-glow">{getCategoryName(doc.category)} • Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getDocumentStatusIcon(doc.status)}
                      <Badge className={
                        doc.status === 'approved' ? 'bg-green-700 text-green-200 font-bold drop-shadow-glow animate-glow' :
                        doc.status === 'pending' ? 'bg-yellow-700 text-yellow-200 font-bold drop-shadow-glow animate-glow' :
                        'bg-red-700 text-red-200 font-bold drop-shadow-glow animate-glow'
                      }>
                        {doc.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-300 font-bold drop-shadow-glow animate-glow">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-300 drop-shadow-glow animate-glow" />
                Risk Events & Alerts
              </CardTitle>
              <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Historical and current compliance issues</CardDescription>
            </CardHeader>
            <CardContent>
              {supplier.riskEvents.length > 0 ? (
                <div className="space-y-4">
                  {supplier.riskEvents.map((event) => (
                    <div key={event.id} className={`p-4 rounded-lg border-l-4 drop-shadow-glow animate-glow ${
                      event.severity === 'high' ? 'border-l-red-400 bg-red-900/80' :
                      event.severity === 'medium' ? 'border-l-yellow-400 bg-yellow-900/80' :
                      'border-l-green-400 bg-green-900/80'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white drop-shadow-glow animate-glow">{event.type}</h3>
                        <Badge className={
                          event.severity === 'high' ? 'bg-red-700 text-red-200 font-bold drop-shadow-glow animate-glow' :
                          event.severity === 'medium' ? 'bg-yellow-700 text-yellow-200 font-bold drop-shadow-glow animate-glow' :
                          'bg-green-700 text-green-200 font-bold drop-shadow-glow animate-glow'
                        }>
                          {event.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-white/80 mb-2 drop-shadow-glow animate-glow">{event.description}</p>
                      <div className="flex items-center text-sm text-blue-200 drop-shadow-glow animate-glow">
                        <Calendar className="h-4 w-4 mr-1 text-blue-300 drop-shadow-glow animate-glow" />
                        {event.date}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-green-200 drop-shadow-glow animate-glow">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-300 drop-shadow-glow animate-glow" />
                  <p className="text-lg font-bold drop-shadow-glow animate-glow">No Risk Events</p>
                  <p>This supplier has maintained excellent compliance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-300 font-bold drop-shadow-glow animate-glow">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-300 drop-shadow-glow animate-glow" />
                Risk Evolution Timeline
              </CardTitle>
              <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Track how supplier risk has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                    <CheckCircle className="h-4 w-4 text-green-200 drop-shadow-glow animate-glow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white drop-shadow-glow animate-glow">Current Status</h3>
                    <p className="text-sm text-green-200 drop-shadow-glow animate-glow">ESG Score: {supplier.esgScore}/100</p>
                    <p className="text-xs text-blue-200 drop-shadow-glow animate-glow">Last updated: Today</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-900 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                    <Award className="h-4 w-4 text-blue-300 drop-shadow-glow animate-glow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white drop-shadow-glow animate-glow">Certification Renewal</h3>
                    <p className="text-sm text-blue-200 drop-shadow-glow animate-glow">ISO 14001 certification renewed</p>
                    <p className="text-xs text-blue-200 drop-shadow-glow animate-glow">{supplier.lastAudit}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                    <AlertTriangle className="h-4 w-4 text-yellow-200 drop-shadow-glow animate-glow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white drop-shadow-glow animate-glow">Compliance Review</h3>
                    <p className="text-sm text-yellow-200 drop-shadow-glow animate-glow">Quarterly audit completed</p>
                    <p className="text-xs text-blue-200 drop-shadow-glow animate-glow">3 months ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-700 p-2 rounded-full shadow drop-shadow-glow animate-glow">
                    <TrendingUp className="h-4 w-4 text-green-200 drop-shadow-glow animate-glow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white drop-shadow-glow animate-glow">Score Improvement</h3>
                    <p className="text-sm text-green-200 drop-shadow-glow animate-glow">ESG score increased from 75 to {supplier.esgScore}</p>
                    <p className="text-xs text-blue-200 drop-shadow-glow animate-glow">6 months ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="mt-8 bg-black/80 shadow-2xl drop-shadow-glow animate-glow">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-300 drop-shadow-glow animate-glow">Risk Reduction Recommendations</CardTitle>
          <CardDescription className="text-white/80 drop-shadow-glow animate-glow">Automated AI suggestions for improving supplier compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white mb-3 drop-shadow-glow animate-glow">Priority Actions</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-300 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                  <span className="text-white drop-shadow-glow animate-glow">Address environmental compliance gaps</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-300 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                  <span className="text-white drop-shadow-glow animate-glow">Improve transparency reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-300 mr-2 mt-0.5 drop-shadow-glow animate-glow" />
                  <span className="text-white drop-shadow-glow animate-glow">Increase renewable energy usage</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3 drop-shadow-glow animate-glow">Next Review</h3>
              <div className="bg-blue-900 p-4 rounded-lg shadow drop-shadow-glow animate-glow">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-300 mr-2 drop-shadow-glow animate-glow" />
                  <span className="font-bold text-white drop-shadow-glow animate-glow">Next Audit Due</span>
                </div>
                <p className="text-sm text-blue-200 mt-1 drop-shadow-glow animate-glow">Scheduled for 3 months from last audit date</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDetail;
