import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    TYPE,
    arrange,
    eventStartDate,
    listYN,
    numOfRows,
    pageNo,
    contentTypeId,
    mapX,
    mapY,
    radius,
  } = body as TourEventRequest &
    TourPlaceBasedRequest & {
      TYPE: string;
    };

  if (TYPE === "event") {
    const event = await fetch(
      `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${process.env.TOUR_API_KEY}&MobileOS=ETC&MobileApp=Photoisk&_type=json&listYN=${listYN}&arrange=${arrange}&eventStartDate=${eventStartDate}&numOfRows=${numOfRows}&pageNo=${pageNo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = (await event.json()) as TourEventResponse;

    return NextResponse.json({
      message: response,
    });
  }

  if (TYPE === "place") {
    const place = await fetch(
      `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${process.env.TOUR_API_KEY}&MobileOS=ETC&MobileApp=Photoisk&_type=json&listYN=${listYN}&arrange=${arrange}&eventStartDate=${eventStartDate}&numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=${contentTypeId}&mapX=${mapX}&mapY=${mapY}&radius=${radius}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = (await place.json()) as TourPlaceBasedResponse;

    return NextResponse.json({
      message: response,
    });
  }

  return NextResponse.json({
    message: "Bad Request",
  });
}
