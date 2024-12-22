
export type Post = {
  id: string;
  body: string;
  createdAt: Date;
  username: string;
  likeCount: number;
  likes: Like[];
  commentCount: number;
  comments: Comment[];
};

export type Like = {
  username: string;
};

export type Comment = {
  id: string;
  username: string;
  createdAt: Date;
  body: string;
};
