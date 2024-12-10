import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useRegionsStore } from "../store/regionsStore";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import "../style/RegionDetailPage.css";

export function RegionDetailPage() {
  const { regionId } = useParams();

  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const region = regions.find((r) => r.id === regionId);

  if (!region) {
    return (
      <div className="page-container">
        <p>Region not found</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/regions" className="back-button">
        <ArrowLeft className="back-icon" />
        Back to Regions
      </Link>

      <div className="region-image-container">
        <img src={region.imageUrl} alt={region.name} className="region-image" />
        <div className="region-overlay" />
        <div className="region-info">
          <h1 className="region-title">{region.name}</h1>
          <p className="region-description">{region.description}</p>
        </div>
      </div>

      <div className="countries-section">
        <h2 className="countries-heading">Featured Countries</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {region.countries.map((country) => (
            <Link
              key={country}
              to={`/regions/${region.id}/countries/${country.toLowerCase()}`}
              className="country-card group"
            >
              <div className="country-card-content">
                <div className="country-card-header">
                  <h1>{country}</h1>
                  <UtensilsCrossed className="country-icon" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
