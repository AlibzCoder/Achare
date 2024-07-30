import { LatLngLiteral } from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";


const CatchContext = (props: { onchange: (latlng: LatLngLiteral) => void }) => {
  const { onchange } = props;
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
      if (onchange) onchange(e.latlng);
    },
    move(e) {
      if (onchange) onchange(map.getCenter());
    },
  });
  useEffect(()=>{
    if (onchange) onchange(map.getCenter());
  },[])
  return <></>;
};

const Map = (props: { setLatLng: (latlng: LatLngLiteral) => void }) => {
  const { setLatLng } = props;

  return (
    <div className="map h-full w-full relative">
      <MapContainer
        className="h-full w-full"
        center={[35.691221419932155, 51.391918659210205]}
        zoom={12}
        zoomControl={false}
      >
        <CatchContext onchange={(latlng: LatLngLiteral) => setLatLng(latlng)} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="center-marker"></div>
      </MapContainer>
    </div>
  );
};

export default Map;
