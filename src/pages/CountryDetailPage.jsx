import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EstablishmentCard } from "../components/establishments/EstablishmentCard";
import { useCountriesStore } from "../store/countriesStore";
import { useEstablishmentsStore } from "../store/establishmentsStore";
import "../style/CountryDetailPage.css";
export function CountryDetailPage() {
  const { regionId, countryId } = useParams();

  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    fetchCountries,
    fetchDishesByCountry,
  } = useCountriesStore();

  const { establishments, fetchEstablishments, filterByCountry } =
    useEstablishmentsStore();

  const [traditionalDishes, setTraditionalDishes] = useState([]);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
    if (establishments.length === 0) {
      fetchEstablishments();
    }
  }, [countries, establishments, fetchCountries, fetchEstablishments]);

  useEffect(() => {
    const selected = countries.find((c) => c.id === countryId);
    if (selected) {
      setSelectedCountry(selected);
      fetchTraditionalDishes(selected.name);
    }
  }, [countries, countryId, setSelectedCountry]);

  const fetchTraditionalDishes = async (countryName) => {
    const dishes = await fetchDishesByCountry(countryName);
    setTraditionalDishes(dishes);
  };

  const filteredEstablishments = filterByCountry(countryId);

  if (!selectedCountry) {
    return (
      <div className="page-container">
        <p>Country not found</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to={`/regions/${regionId}`} className="back-link">
        <ArrowLeft className="back-link-icon" />
        Back to Region
      </Link>

      <div className="hero-image-container">
        <img
          src={selectedCountry.imageUrl}
          alt={selectedCountry.name}
          className="hero-image"
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-text">
          <h1 className="hero-title">{selectedCountry.name}</h1>
          <p className="hero-description">{selectedCountry.description}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="section-title">Traditional Dishes</h2>
        <div className="establishments-grid">
          {traditionalDishes.length > 0 ? (
            traditionalDishes.map((dish) => (
              <div key={dish.id} className="traditional-dish-card">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="traditional-dish-image"
                />
                <div className="traditional-dish-content">
                  <h3 className="traditional-dish-title">{dish.name}</h3>
                  <p className="traditional-dish-description">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No traditional dishes available.</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="section-title">Popular Establishments</h2>
        <div className="establishments-grid">
          {filteredEstablishments.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
