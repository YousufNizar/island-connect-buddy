import { useRef, useState } from 'react';

interface PlacesAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const PlacesAutocomplete = ({ onPlaceSelected }: PlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search places in Sri Lanka..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      {predictions.length > 0 && (
        <div className="mt-2 border rounded-lg overflow-hidden">
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = prediction.description;
                }
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {prediction.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;