"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Lightbox from "@/components/LightBox";
import Loading from "@/components/Loading";


export default function Home() {
  const [imageURLs, setImageURLs] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      let data: any = await fetch('/api/images')
      data = await data.json()
      setImageURLs(data)
    }
    fetchImages()
  }, [])

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex !== null && prevIndex < imageURLs.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-full p-4 sm:p-8 md:p-16 lg:p-24">
      <h1 className="text-2xl mb-8">Photo Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {imageURLs[0] ? imageURLs.map((item, idx) =>
          <Card url={item} key={idx} onClick={() => setSelectedImageIndex(idx)} />
        ) : <Loading/>}
      </div>
      {selectedImageIndex !== null && (
        <Lightbox
          src={imageURLs[selectedImageIndex]}
          onClose={() => setSelectedImageIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedImageIndex > 0}
          hasNext={selectedImageIndex < imageURLs.length - 1}
        />
      )}
    </main>
  );
}