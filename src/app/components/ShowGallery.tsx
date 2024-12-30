"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShowGalleryPage2() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/gallerys");
        const result = await response.json();

        if (result.success) {
          setGallery(result.data);
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1
        className="rounded text-xl font-bold mb-6 bg-blue-600 p-2 mx-auto 
      flex text-white bg-gradient-to-r from-blue-500 to-white"
      >
        ภาพกิจกรรม
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {gallery.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul>
            {gallery.map((item) => (
              <li key={item.id}>
                {/* <h2>{item.title}</h2> */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                  width={200}
                  height={200}
                  // style={{ maxWidth: "300px" }}
                />
                {item.description && <p>{item.description}</p>}
                <p>
                  <small>
                    Added on: {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
