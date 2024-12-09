import { Star, MapPin, Bookmark } from 'lucide-react';
import { useEstablishmentsStore } from '../../store/establishmentsStore';
import { useAuthStore } from '../../store/authStore'; // Імпортуємо useAuthStore
import '../../style/EstablishmentCard.css'; // Підключаємо стилі

export function EstablishmentCard({ establishment }) {
  const { savedEstablishments, toggleSaved } = useEstablishmentsStore();
  const { isAuthenticated } = useAuthStore(); // Отримуємо статус аутентифікації
  const isSaved = savedEstablishments.includes(establishment.id);

  return (
    <div className="establishment-card">
      <div className="relative">
        <img
          src={establishment.imageUrl}
          alt={establishment.name}
          className="establishment-image"
        />
        
        {/* Показувати кнопку збереження лише якщо користувач авторизований */}
        {isAuthenticated && (
          <button
            onClick={() => toggleSaved(establishment.id)}
            className="save-est-button"
          >
            <Bookmark
              className={`bookmark-icon ${isSaved ? 'fill-red-600 text-red-600' : 'text-gray-600'}`}
            />
          </button>
        )}
      </div>
      
      <div className="p-6">
        <div className="establishment-title-container">
          <h3 className="establishment-title">
            {establishment.name}
          </h3>
          <div className="rating-container">
            <Star className="rating-icon" />
            <span className="rating-text">{establishment.rating}</span>
          </div>
        </div>
        <div className="address-container">
          <MapPin className="address-icon" />
          {establishment.address}
        </div>
        <p className="establishment-description">{establishment.description}</p>
        <div className="type-tags">
          {establishment.type.map((type) => (
            <span key={type} className="type-tag">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
