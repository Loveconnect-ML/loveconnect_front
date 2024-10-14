import { NextResponse } from "next/server";

// 이미지 데이터베이스 참조 (예시)
import { imageDatabase } from "../../images/route";
// /api/images/{imageId}/recommendations
export async function GET(
  request: Request,
  { params }: { params: { imageId: string } }
) {
  const { imageId } = params;

  // 이미지 데이터베이스에서 imageId를 기반으로 이미지 정보 조회
  const imageData = imageDatabase[imageId];

  if (!imageData) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  // 추천 이미지 계산 (예: 유사도 모델 사용)
  try {
    const recommendedImages = await getRecommendedImages(imageData.url);
    return NextResponse.json({ recommendations: recommendedImages });
  } catch (error) {
    console.error("Error fetching recommended images:", error);
    return NextResponse.json(
      { error: "Recommendation failed" },
      { status: 500 }
    );
  }
}

// 유사 이미지 추천 함수 (예시)
async function getRecommendedImages(imageUrl: string) {
  // 유사도 비교를 위해 사전 학습된 모델 사용 (예: FaceNet, ResNet 등)
  const similarImages = await fetchSimilarityModel(imageUrl);
  return similarImages.slice(0, 4); // 유사도 순으로 상위 4개 이미지 반환
}
