import { useGeo } from "@/hooks/useGeo";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ position, setPosition }: { position: { lat: number; lng: number } | null; setPosition: (position: { lat: number; lng: number }) => void }) => {
  // const KakaoMap = () => {
  // const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const { location, error } = useGeo();

  const [first, setFirst] = useState(true);
  // const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (_: any, mouseEvent: kakao.maps.event.MouseEvent) => {
    const latlng = mouseEvent.latLng;
    setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
    toast(`클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`);
  };

  // useEffect(() => {
  //   setPosition({ lat: location.latitude, lng: location.longitude });
  // }, []);

  useEffect(() => {
    if (location.latitude && location.longitude && first) {
      setPosition({ lat: location.latitude, lng: location.longitude });
      setFirst(false);
    }
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!position || !location) {
    return <div>위치를 불러오는 중입니다...</div>;
  }

  return (
    <Map

      center={{
        lng: location.longitude,
        lat: location.latitude,
      }}
      // onCenterChanged={(center) => {
      //   const pos = center.getCenter();
      //   setPosition({
      //     lat: pos.getLat(),
      //     lng: pos.getLng(),
      //   });
      // }}
      // onLoad={() => {
      //   setPosition({ lat: location.latitude, lng: location.longitude });
      // }}
      // onCenterChanged={(map) => {
      //   const center = map.getCenter();
      //   setPosition({ lat: center.getLat(), lng: center.getLng() });
      // }}
      style={{ width: "100%", height: "100%" }}
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