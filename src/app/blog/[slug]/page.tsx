// app/blog/[slug]/page.tsx

import { PortableText, type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { groq } from 'next-sanity';
import Image from "next/image";

export const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    author->{name},
    publishedAt,
    "slug": slug.current,
    mainImage {
      asset->
    },
    body
  }
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

   export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
    
      const post = await client.fetch<SanityDocument>(
        query,
        { slug },
        { next: { revalidate: 30 } }
      );
    
      // ...rest of your code unchanged
    
    
 
  if (!post) {
    return <div>Post not found.</div>;
  }

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).url()
    : null;

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full bg-black h-[300px] flex items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl">
          {post.title}
        </h1>
      </div>

      <div className="w-full flex justify-center px-4">
        <article className="prose prose-lg max-w-3xl w-full py-12">
          <Link href="/blog" className="no-underline inline-flex items-center mb-8 gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
            ← Back to posts
          </Link>

          {postImageUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-xl shadow-lg mb-8 overflow-hidden">
              <Image
                src={postImageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="text-gray-500 mb-6">
            Published: {new Date(post.publishedAt).toLocaleDateString()}
            {post.author?.name && (
              <span> | Author: {post.author.name}</span>
            )}
          </p>

          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </article>
      </div>
    </main>
  );
}