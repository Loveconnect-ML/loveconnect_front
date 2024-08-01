import { useGeo } from "@/hooks/useGeo";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ position, setPosition }: { position: { lat: number; lng: number } | null; setPosition: (position: { lat: number; lng: number }) => void }) => {
  // const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const { location, error } = useGeo();

  const handleMapClick = (_: any, mouseEvent: kakao.maps.event.MouseEvent) => {
    const latlng = mouseEvent.latLng;
    setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
    toast(`클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Map
      center={{ lat: location.latitude, lng: location.longitude }}
      style={{ width: "100%", height: "400px" }}
      level={3}
      onClick={handleMapClick}
    >
      {position && (
        <MapMarker position={position} />
      )}
    </Map>
  );
};

export default KakaoMap;