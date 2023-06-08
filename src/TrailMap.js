import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function TrailMap({ place }) {
  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            place
          )}&key=AIzaSyC7Wg_zfZ95N3xx2LYWhPafhSuUU8QT1wA`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCoordinates({ lat, lng });
          } else {
            throw new Error('Invalid coordinates for the place');
          }
        } else {
          throw new Error('Failed to fetch coordinates');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [place]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyD2vVtMVL3jAyaNQYOQ_qAcUsmOcn2SkzM">
      <GoogleMap mapContainerStyle={mapStyles} center={coordinates} zoom={10}>
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
}

export default TrailMap;
