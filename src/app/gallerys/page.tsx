// "use client";

// import { useEffect, useState } from "react";

// interface GalleryItem {
//   id: number;
//   title: string;
//   description?: string;
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function GalleryPage() {
//   const [gallery, setGallery] = useState<GalleryItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchGallery() {
//       try {
//         const response = await fetch("/api/gallerys");
//         const result = await response.json();

//         if (result.success) {
//           setGallery(result.data);
//         }
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchGallery();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1
//         className="rounded text-xl font-bold mb-6 bg-blue-600 p-2 mx-auto 
//       flex justify-center text-white"
//       >
//         ภาพกิจกรรม
//       </h1>
//       {gallery.length === 0 ? (
//         <p>No items found.</p>
//       ) : (
//         <ul>
//           {gallery.map((item) => (
//             <li key={item.id}>
//               <h2>{item.title}</h2>
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 style={{ maxWidth: "200px" }}
//               />
//               {item.description && <p>{item.description}</p>}
//               <p>
//                 <small>
//                   Added on: {new Date(item.createdAt).toLocaleDateString()}
//                 </small>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React from 'react'
import ShowGalleryPage2 from '../components/ShowGallery'

const GalleryPage = () => {
  return (
    <div>
      <ShowGalleryPage2 />
    </div>
  )
}

export default GalleryPage
