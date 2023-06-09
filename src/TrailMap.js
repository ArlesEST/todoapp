import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function TrailMap({ place }) {
  const mapStyles = {
    height: '500px',
    width: '500px',
  };

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //window.location.reload(false);
    setOpen(false);
    //setCoordinates({ lat: 0, lng: 0 });
    setLoading(false);
  };
  

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
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open Map
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby='map of the trail'
        aria-labelledby='map'
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={coordinates}
                zoom={10}
              >
                <Marker position={coordinates} />
              </GoogleMap>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TrailMap;
