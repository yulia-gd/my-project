import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../../style/RegionCard.css'

export function RegionCard({ region }) {
  return (
    <Link
      to={`/regions/${region.id}`}
      className="region-card group" 
    >
      <div className="region-card-image-container">
        <img
          src={region.imageUrl}
          alt={region.name}
          className="region-card-image" 
        />
      </div>
      <div className="region-card-text">
        <h3 className="region-card-title">
          {region.name}
        </h3>
        <p className="region-card-description">
          {region.description}
        </p>
        <div className="region-card-footer">
          <span className="region-card-footer-text">Explore region</span>
          <ChevronRight className="region-card-footer-icon" />
        </div>
      </div>
    </Link>
  );
}
