import React from 'react';
import GoogleMapReact from 'google-map-react';
import { map } from 'lodash/fp';
import mapStyle from './mapStyle.json';
import { Worker } from 'types/common';
import css from './styles.module.scss';
const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

const Marker = ({ lat, lng }: { lat: number; lng: number }) => (
  <div className={css.marker} />
);

const WorkersMap = ({ data }: { data: Worker[] }) => {
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
  const renderMarker = (item: Worker) => (
    <Marker
      key={item.id}
      lat={item.systemInfo.latitude}
      lng={item.systemInfo.longitude}
    />
  );

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={props.center}
      defaultZoom={props.zoom}
      options={mapOptions}
    >
      {map(renderMarker)(data as [])}
    </GoogleMapReact>
  );
};

export default WorkersMap;
