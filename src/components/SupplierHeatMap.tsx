import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, AlertTriangle } from "lucide-react";
import { Supplier } from "@/data/mockData";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

interface SupplierHeatMapProps {
  suppliers: Supplier[];
  onSupplierSelect: (supplierId: string) => void;
}

const SupplierHeatMap = ({
  suppliers,
  onSupplierSelect,
}: SupplierHeatMapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // <-- Replace with your API key
  });

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 22.9734,
    lng: 78.6569,
  };

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const getMarkerColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "medium":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "high":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            India Supplier Risk Heat Map
          </CardTitle>
          <CardDescription>
            Interactive map of supplier ESG risk levels across India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Low Risk (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Medium Risk (60–79)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">High Risk (&lt;60)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Map */}
      <Card>
        <CardContent className="p-0">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
            >
              {suppliers.map((supplier) => (
                <Marker
                  key={supplier.id}
                  position={{
                    lat: supplier.location.lat,
                    lng: supplier.location.lng,
                  }}
                  icon={getMarkerColor(supplier.riskLevel)}
                  onClick={() => setSelectedSupplier(supplier)}
                />
              ))}

              {selectedSupplier && (
                <InfoWindow
                  position={{
                    lat: selectedSupplier.location.lat,
                    lng: selectedSupplier.location.lng,
                  }}
                  onCloseClick={() => setSelectedSupplier(null)}
                >
                  <div className="p-2">
                    <h4 className="font-bold text-sm">
                      {selectedSupplier.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {selectedSupplier.location.city},{" "}
                      {selectedSupplier.location.state}
                    </p>
                    <p className="text-xs">
                      ESG Score: {selectedSupplier.esgScore}/100
                    </p>
                    <Badge
                      className={`mt-1 ${
                        selectedSupplier.riskLevel === "low"
                          ? "bg-green-100 text-green-800"
                          : selectedSupplier.riskLevel === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedSupplier.riskLevel.toUpperCase()}
                    </Badge>
                    <Button
                      onClick={() => {
                        onSupplierSelect(selectedSupplier.id);
                        setSelectedSupplier(null);
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <p className="text-center p-6 text-gray-500">Loading map...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierHeatMap;
