'use client'
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface ImageData {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const page = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(response => response.json())
      .then((data: ImageData[]) => {
        setImages(data);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleButtonClick = () => {
    const newIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(newIndex);
  };

  const currentImage = useMemo(() => images[currentImageIndex], [images, currentImageIndex]);

  return (
    <div>
      <h1>Next.js Skills Page</h1>
      <div>
        <h2>Using Next.js Image Component</h2>
        <Image
          src={currentImage ? currentImage.url : ''}
          alt={currentImage ? currentImage.title : ''}
          width={300}
          height={300}
          layout="responsive"
        />
      </div>
      <div>
        <h2>Custom Component with API Integration</h2>
        <div>
          {currentImage && (
            <img
              src={currentImage.url}
              alt={currentImage.title}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <button onClick={handleButtonClick}>Change Image</button>
        </div>
      </div>
    </div>
  );
};

export default page;
