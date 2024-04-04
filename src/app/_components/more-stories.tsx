
'use client'

import { useEffect, useState } from 'react';
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

interface Album {
  userId: number;
  id: number;
  title: string;
}

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const [albums, setAlbums] = useState<Album[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1/albums');
        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
    <div>
      <h1>Albums</h1>
      <ol>
        {albums.map((album: Album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ol>
    </div>
    </>
  );
}
