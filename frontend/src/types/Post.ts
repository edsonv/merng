
export type Post = {
  id: string;
  body: string;
  createdAt: Date;
  username: string;
  likeCount: number;
  likes: Like[];
  commentCount: number;
  comments: Comment[];
  __typename: string;
};

export type Like = {
  username: string;
  __typename: string;
};

export type Comment = {
  id: string;
  username: string;
  createdAt: Date;
  body: string;
  __typename: string;
};
