import WebcamComponent from "@/components/WebcamComponent";
import WebcamProvider from "@/components/WebcamProvider";
import PhotoiskPage from "@/components/pages/PhotoiskPage";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full bg-gray-50 overflow-clip">
      <div className="pb-[10%] flex flex-col justify-start items-center w-full sm:w-[500px] overflow-y-scroll scrollbar-hide bg-white">
        <WebcamProvider>
          <WebcamComponent />
          <PhotoiskPage />
        </WebcamProvider>
      </div>
    </main>
  );
}
