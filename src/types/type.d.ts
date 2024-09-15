interface ImageResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

interface TourCodeRequest {
  numOfRows: number;
  pageNo: number;
  listYN: string;
  arrange: string;
  contentTypeId?: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

interface TourEventRequest {
  numOfRows: number;
  pageNo: number;
  listYN: string;
  arrange: string;
  contentTypeId: number;
  eventStartDate: string;
}

interface TourPlaceBasedRequest {
  numOfRows: number;
  pageNo: number;
  listYN: string;
  arrange: string;
  contentTypeId: number;
  mapX: number;
  mapY: number;
  radius: number;
}

interface TourEventResponse {
  response: {
    body: {
      numOfRows: number; // 한페이지결과수
      pageNo: number; // 현재페이지번호
      totalCount: number; // 전체결과수
      items: {
        item: TourEventItem[];
      }; // TourItem[]
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

interface TourEventItem {
  addr1?: string; // 주소(예, 서울중구다동)를응답
  addr2?: string; // 상세주소
  areacode?: string; // 지역코드
  booktour?: number; // 교과서속여행지여부 (1=여행지, 0=해당없음)
  cat1?: string; // 대분류코드
  cat2?: string; // 중분류코드
  cat3?: string; // 소분류코드
  contentid: number; // 콘텐츠ID
  contenttypeid: number; // 관광타입(관광지, 숙박등) ID
  createdtime: string; // 콘텐츠최초등록일
  eventstartdate: string; // 행사시작일 (형식 : YYYYMMDD)
  eventenddate: string; // 행사종료일 (형식 : YYYYMMDD)
  firstimage?: string; // 원본대표이미지 (약 500*333 size) URL 응답
  firstimage2?: string; // 썸네일대표이미지 (약 150*100 size) URL 응답
  cpyrhtDivCd?: string; // 저작권 유형 (Type1:제1유형(출처표시-권장) Type3:제3유형(제1유형 + 변경금지))
  mapx?: number; // GPS X좌표 (WGS84 경도좌표) 응답
  mapy?: number; // GPS Y좌표 (WGS84 위도좌표) 응답
  mlevel?: number; // Map Level 응답
  modifiedtime: string; // 콘텐츠수정일
  sigungucode?: number; // 시군구코드
  tel?: string; // 전화번호
  title: string; // 콘텐츠제목
}

interface TourPlaceBasedItem {
  addr1: string; // 주소 (e.g., "서울특별시 중구 명동8길 7")
  addr2: string | null; // 상세주소 (e.g., "(명동2가)"), nullable if not present
  areacode: number; // 지역코드 (e.g., 1)
  booktour: number | null; // 교과서속여행지 여부 (1=여행지, 0=해당없음), nullable if not present
  cat1: string; // 대분류코드 (e.g., "A04")
  cat2: string; // 중분류코드 (e.g., "A0401")
  cat3: string; // 소분류코드 (e.g., "A04010600")
  contentid: number; // 콘텐츠ID (e.g., 1304260)
  contenttypeid: number; // 콘텐츠타입ID (e.g., 38)
  createdtime: string; // 콘텐츠최초등록일 (e.g., "20110610225044")
  dist: number; // 중심좌표로부터 거리 (단위:m) (e.g., 89.19927103776206)
  firstimage: string | null; // 원본대표이미지 URL (e.g., "http://...")
  firstimage2: string | null; // 썸네일대표이미지 URL (e.g., "http://...")
  cpyrhtDivCd: string; // 저작권 유형 (e.g., "Type3")
  mapx: number; // GPS X좌표 (WGS84 경도좌표) (e.g., 126.9847483173)
  mapy: number; // GPS Y좌표 (WGS84 위도좌표) (e.g., 37.5634380519)
  mlevel: number; // Map Level (e.g., 6)
  modifiedtime: string; // 콘텐츠수정일 (e.g., "20220826143107")
  sigungucode: number; // 시군구코드 (e.g., 24)
  tel: string | null; // 전화번호 (e.g., "02-753-9411")
  title: string; // 콘텐츠제목 (e.g., "금강제화 명동본점")
}

interface TourPlaceBasedResponse {
  response: {
    body: {
      items: {
        item: TourPlaceBasedItem[];
      };
      numOfRows: number; // 페이지당 출력 항목 수 (e.g., 10)
      pageNo: number; // 현재 페이지 번호 (e.g., 1)
      totalCount: number; // 총 결과 개수 (e.g., 22)
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

interface Snap {
  id: number;
  title: string;
  content: string;
  image: string?;
  createdAt: string;
  updatedAt: string;
}
