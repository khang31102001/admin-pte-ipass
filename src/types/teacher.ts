export interface ITeacher {
  teacherId: number | null;

  name: string;
  slug: string;
  bio: string;
  content?: string;
  image?: string;

  overallScore?: number | null;
  listeningScore?: number | null;
  speakingScore?: number | null;
  readingScore?: number | null;
  writingScore?: number | null;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number | null;
  isImageChanged?: boolean,
  deleteImageUrl?: string,

}

