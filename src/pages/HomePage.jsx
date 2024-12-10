import { Link } from "react-router-dom";
import { Globe, Search, BookmarkCheck } from "lucide-react";
import { useEffect } from "react";
import { useRegionsStore } from "../store/regionsStore";
import "../style/HomePage.css";

export function HomePage() {
  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  return (
    <div className="relative overflow-hidden">
      <video
        src="/my-project/video.mp4"
        autoPlay
        loop
        muted
        className="video-background"
      />

      <section className="relative bg-white overflow-hidden">
        <div className="section-container">
          <div className="hero-container">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
              <div className="text-center">
                <h1 className="main-heading">
                  <span className="block">Discover the World's</span>
                  <span className="sub-heading">Culinary Heritage</span>
                </h1>
                <p className="description">
                  Explore authentic cuisines, traditional dishes, and local
                  establishments from every corner of the globe.
                </p>
                <div className="button-container">
                  <Link to="/regions" className="explore-button">
                    Start Exploring
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="features-section">
        <div className="section-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="feature-card">
              <div className="flex justify-center">
                <Globe className="feature-icon" />
              </div>
              <h3 className="feature-title">Global Cuisines</h3>
              <p className="feature-description">
                Explore diverse culinary traditions from different regions of
                the world.
              </p>
            </div>
            <div className="feature-card">
              <div className="flex justify-center">
                <Search className="feature-icon" />
              </div>
              <h3 className="feature-title">Find Establishments</h3>
              <p className="feature-description">
                Discover authentic restaurants and eateries in every country.
              </p>
            </div>
            <div className="feature-card">
              <div className="flex justify-center">
                <BookmarkCheck className="feature-icon" />
              </div>
              <h3 className="feature-title">Save Favorites</h3>
              <p className="feature-description">
                Create your personal collection of must-visit culinary
                destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="featured-regions-section">
        <div className="section-container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="featured-heading">Featured Regions</h2>
            <p className="featured-description">
              Begin your culinary journey through these diverse regions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Link
                key={region.id}
                to={`/regions/${region.id}`}
                className="region-card group"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={region.imageUrl}
                    alt={region.name}
                    className="region-image"
                  />
                  <div className="region-overlay" />
                  <div className="region-info">
                    <h3 className="region-title">{region.name}</h3>
                    <p className="region-description">{region.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
