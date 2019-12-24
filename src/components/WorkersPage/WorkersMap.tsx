import React from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './mapStyle.json';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

const WorkersMap = () => {
  const props = {
    center: {
      lat: 40,
      lng: 10
    },
    zoom: 1
  };
  const mapOptions = {
    disableDefaultUI: true,
    minZoom: 1,
    styles: mapStyle
  };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
      options={mapOptions}
    />
  );
};

export default WorkersMap;
