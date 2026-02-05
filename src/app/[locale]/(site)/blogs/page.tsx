import BlogCard from "@/components/shared/blog/blogCard";
import HeroSub from "@/components/shared/hero-sub";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

// Use ISR for instant navigation - blogs are markdown files, rarely change
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | POSKA MANOLITO AG",
  };
}

export default async function Blog() {
  const t = await getTranslations('blog');
  const tNav = await getTranslations('navbar');
  
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/blogs", text: t('breadcrumb.blogList') },
  ];

  return (
    <>
      <HeroSub
        title={t('title')}
        description={t('description')}
        breadcrumbLinks={breadcrumbLinks}
      />
      <section className="flex flex-wrap justify-center dark:bg-darkmode px-4">
        <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto ">
          <div className="grid grid-cols-12 lg:gap-14 gap-6">
            {posts.map((blog, i) => (
              <div key={i} className="w-full col-span-12 lg:col-span-6">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
