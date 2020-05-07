import React from 'react';
import GoogleMapReact from 'google-map-react';
import { map } from 'lodash/fp';
import TooltipTrigger from 'react-popper-tooltip';
import cn from 'classnames';
import mapStyle from './mapStyle.json';
import { Worker } from 'types/common';
import css from './styles.module.scss';
import {
  GetTooltipPropsArg,
  GetTriggerPropsArg,
  Ref,
} from 'react-popper-tooltip/dist/types';
const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

const Tooltip = ({
  tooltipRef,
  getTooltipProps,
  item,
}: {
  tooltipRef: Ref;
  getTooltipProps: (arg?: GetTooltipPropsArg) => GetTooltipPropsArg;
  item: Worker;
}) => (
  <div
    {...getTooltipProps({
      ref: tooltipRef,
      className: css.tooltip,
    })}
  >
    <ul>
      <li>Status: {item.status}</li>
      <li>Name: {item.name}</li>
      <li>Stake: {item.selfStake}</li>
    </ul>
  </div>
);

const Point = ({
  getTriggerProps,
  triggerRef,
  item,
}: {
  getTriggerProps: (arg?: GetTriggerPropsArg) => GetTriggerPropsArg;
  triggerRef: Ref;
  item: Worker;
}) => (
  <div
    {...getTriggerProps({
      ref: triggerRef,
    })}
  >
    <div className={cn(css.marker, [css[item.status]])} />
  </div>
);

const Marker = ({ item }: { lat: number; lng: number; item: Worker }) => {
  return (
    <TooltipTrigger
      placement="top"
      tooltip={(tooltip) => <Tooltip item={item} {...tooltip} />}
    >
      {(trigger) => <Point item={item} {...trigger} />}
    </TooltipTrigger>
  );
};

const WorkersMap = ({ data }: { data: Worker[] }) => {
  const props = {
    center: {
      lat: 40,
      lng: 10,
    },
    zoom: 1,
  };
  const mapOptions = {
    disableDefaultUI: true,
    minZoom: 1,
    styles: mapStyle,
  };
  const renderMarker = (item: Worker) => (
    <Marker
      key={item.id}
      lat={item.systemInfo.latitude}
      lng={item.systemInfo.longitude}
      item={item}
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
