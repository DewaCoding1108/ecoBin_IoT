import Image from "next/image";
import WebCam from "@/app/component/WebCam";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className ="bg-gray-200">
      <WebCam userID={params.slug}/>
    </main>
  );
}