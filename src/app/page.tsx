import WebcamComponent from "@/components/WebcamComponent";
import WebcamProvider from "@/components/WebcamProvider";
import PhotoiskPage from "@/components/pages/PhotoiskPage";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="flex flex-col justify-start items-center w-full sm:w-[500px] h-full bg-white">
        <WebcamProvider>
          <WebcamComponent />
          <PhotoiskPage />
        </WebcamProvider>
      </div>
    </main>
  );
}
