import { IMedia } from './../types/media';
import { IUpdateNewsRq, News } from "@/types/news";




export function mapToUpdateRq(news: IUpdateNewsRq): IUpdateNewsRq {
  return {
    title: news.title ?? "",
    slug: news.slug ?? "",
    description: news.description ?? "",
    content: news.content ?? "",
    categoryId: news.categoryId ?? null,
    status: news.status ?? undefined,
    startDate: news.startDate ?? null,
    endDate: news.endDate ?? null,
    isFeatured: news.isFeatured ?? false,
    metaTitle: news.metaTitle ?? "",
    metaDescription: news.metaDescription ?? "",
    keywords: news.keywords ?? [],
    tags: news.tags ?? [],
    noindex: news.noindex ?? false,
    canonical: news.canonical ?? null,
    isImageChanged: news.isImageChanged ?? false,
    deleteImageUrl: news.deleteImageUrl ?? "",

  };
}

export function mapToCreateRq(news: IUpdateNewsRq): IUpdateNewsRq {
  return {
    title: news.title ?? "",
    slug: news.slug ?? "",
    description: news.description ?? "",
    content: news.content ?? "",
    categoryId: news.categoryId ?? null,
    status: news.status ?? undefined,
    startDate: news.startDate ?? null,
    endDate: news.endDate ?? null,
    isFeatured: news.isFeatured ?? false,
    metaTitle: news.metaTitle ?? "",
    metaDescription: news.metaDescription ?? "",
    keywords: news.keywords ?? [],
    tags: news.tags ?? [],
    noindex: news.noindex ?? false,
    canonical: news.canonical ?? null,
    isImageChanged: news.isImageChanged ?? false,
    deleteImageUrl: news.deleteImageUrl ?? "",

  };
}



export function mapToFormSubmit(news: News, media: IMedia): IUpdateNewsRq {

   const hasFile = !!media.file;
  return {
    newsId: news.newsId ?? null,
    title: news.title ?? "",
    image: news.image ?? "",
    slug: news.slug ?? "",
    description: news.description ?? "",
    content: news.content ?? "",
    categoryId: news.categoryId ?? null,
    status: news.status ?? undefined,
    startDate: news.startDate ?? null,
    endDate: news.endDate ?? null,
    isFeatured: news.isFeatured ?? false,
    metaTitle: news.metaTitle ?? "",
    metaDescription: news.metaDescription ?? "",
    keywords: news.keywords ?? [],
    tags: news.tags ?? [],
    noindex: news.noindex ?? false,
    canonical: news.canonical ?? null,
    imgFile: hasFile ?  media.file! : null,
    isImageChanged: media.isImageChanged ?? false,
    deleteImageUrl: media.deleteImageUrl ?? "",

  };
}






