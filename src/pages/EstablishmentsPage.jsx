import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { useEstablishmentsStore } from "../store/establishmentsStore";
import { EstablishmentCard } from "../components/establishments/EstablishmentCard";
import "../style/EstablishmentsPage.css";

const ESTABLISHMENT_TYPES = [
  "restaurant",
  "street-food",
  "cafe",
  "traditional",
  "casual",
  "fine-dining",
];

export function EstablishmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { establishments, fetchEstablishments } = useEstablishmentsStore(
    (state) => ({
      establishments: state.establishments,
      fetchEstablishments: state.fetchEstablishments,
    })
  );

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  const uniqueCountries = Array.from(
    new Set(establishments.map((establishment) => establishment.country))
  );

  const uniqueCities = Array.from(
    new Set(
      establishments.map((establishment) => establishment.address.split(",")[0])
    )
  );

  const filteredEstablishments = establishments.filter((establishment) => {
    const matchesSearch = establishment.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType
      ? establishment.type.includes(selectedType)
      : true;
    const matchesCountry = selectedCountry
      ? establishment.country === selectedCountry
      : true;
    const matchesCity = selectedCity
      ? establishment.address.split(",")[0] === selectedCity
      : true;
    return matchesSearch && matchesType && matchesCountry && matchesCity;
  });

  return (
    <div className="establishments-page-container">
      <div className="text-center mb-12">
        <h1 className="page-title">Culinary Establishments</h1>
        <p className="page-description">
          Discover amazing restaurants and eateries around the world
        </p>
      </div>

      <div className="filters-container">
        <div className="search-input-container">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="filter-icon" />
          </div>
          <input
            type="text"
            placeholder="Search establishments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-select-container">
          <select
            value={selectedType || ""}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {ESTABLISHMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="filter-icon" />
          </div>
        </div>

        <div className="filter-select-container">
          <select
            value={selectedCountry || ""}
            onChange={(e) => setSelectedCountry(e.target.value || null)}
            className="filter-select"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country.charAt(0).toUpperCase() + country.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="filter-icon" />
          </div>
        </div>

        <div className="filter-select-container">
          <select
            value={selectedCity || ""}
            onChange={(e) => setSelectedCity(e.target.value || null)}
            className="filter-select"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Filter className="filter-icon" />
          </div>
        </div>
      </div>

      <div className="establishment-card-container">
        {filteredEstablishments.map((establishment) => (
          <EstablishmentCard
            key={establishment.id}
            establishment={establishment}
          />
        ))}
      </div>

      {filteredEstablishments.length === 0 && (
        <div className="no-establishments-message">
          <p>No establishments found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
