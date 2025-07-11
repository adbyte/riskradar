
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Phone, Mail, Globe, Save } from "lucide-react";
import SupplierNavbar from "@/components/SupplierNavbar";
import { useToast } from "@/hooks/use-toast";

const SupplierProfile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your company profile has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <SupplierNavbar />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900  dark:text-white mb-2 ">
            Company Profile
          </h1>
          <p className="text-gray-600">
            Manage your company information and contact details
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    ABC Manufacturing Ltd.
                  </h3>
                  <p className="text-gray-600">Supplier ID: SUP-001</p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    Mumbai, Maharashtra, India
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    +91 98765 43210
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    contact@abcmanufacturing.com
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    www.abcmanufacturing.com
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Active Certifications</h4>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start">
                      ISO 14001
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start">
                      SA8000
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start">
                      Fair Trade
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details and ensure information accuracy
                  for compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      defaultValue="ABC Manufacturing Ltd."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      defaultValue="MH-2019-PLC-123456"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      defaultValue="Manufacturing - Textiles"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Input id="employees" defaultValue="500-1000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="Plot No. 45, Industrial Area, Andheri East, Mumbai, Maharashtra 400069, India"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="contact@abcmanufacturing.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      defaultValue="www.abcmanufacturing.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearEstablished">Year Established</Label>
                    <Input id="yearEstablished" defaultValue="2019" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="ABC Manufacturing Ltd. is a leading textile manufacturer specializing in sustainable and ethical production practices. We are committed to environmental responsibility and fair labor practices across our operations."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="products">Products/Services</Label>
                  <Textarea
                    id="products"
                    defaultValue="Organic cotton textiles, Sustainable fabric manufacturing, Custom apparel production, Eco-friendly packaging solutions"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Persons */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Key Contacts</CardTitle>
                <CardDescription>
                  Manage primary contacts for different departments and
                  compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label className="text-sm font-medium">ESG Manager</Label>
                      <Input defaultValue="Priya Sharma" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        defaultValue="priya.sharma@abcmanufacturing.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <Input defaultValue="+91 98765 43211" className="mt-1" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label className="text-sm font-medium">
                        Operations Head
                      </Label>
                      <Input defaultValue="Rajesh Kumar" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        defaultValue="rajesh.kumar@abcmanufacturing.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <Input defaultValue="+91 98765 43212" className="mt-1" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label className="text-sm font-medium">HR Director</Label>
                      <Input defaultValue="Anita Desai" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        defaultValue="anita.desai@abcmanufacturing.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <Input defaultValue="+91 98765 43213" className="mt-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
