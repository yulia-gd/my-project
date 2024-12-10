import React, { useEffect } from "react";
import { useRegionsStore } from "../store/regionsStore";
import { RegionCard } from "../components/regions/RegionCard";
import { Globe } from "lucide-react";
import "../style/RegionPage.css";

export function RegionsPage() {
  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    if (regions.length === 0) {
      fetchRegions();
    }
  }, [regions, fetchRegions]);

  if (regions.length === 0) {
    return (
      <div className="page-container">
        <div className="page-header">
          <div className="header-icon">
            <Globe className="globe-icon" />
          </div>
          <h1 className="page-title">Explore World Cuisines</h1>
          <p className="page-description">
            Discover culinary traditions from different parts of the world
          </p>
        </div>
        <p>Loading regions...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-icon">
          <Globe className="globe-icon" />
        </div>
        <h1 className="page-title">Explore World Cuisines</h1>
        <p className="page-description">
          Discover culinary traditions from different parts of the world
        </p>
      </div>

      <div className="regions-grid">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </div>
    </div>
  );
}
