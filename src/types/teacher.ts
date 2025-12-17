export interface ITeacher {
  teacherId: number | null;

  name: string;
  slug: string;
  bio: string;
  content?: string;
  image?: string;

  overallScore: string;
  listeningScore: string;
  speakingScore: string;
  readingScore: string;
  writingScore: string;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  version?: number | null;
  isImageChanged?: boolean,
  deleteImageUrl?: string,

}

