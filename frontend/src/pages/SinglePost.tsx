import { PostCard } from '@/components/PostCard/PostCard';
import { GET_POST } from '@/graphql/Posts/getPost';
// import { useAuthContext } from '@/hooks/useAuthContext';
import { Post } from '@/types/Post';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

export const SinglePost = () => {
  // const { user } = useAuthContext();
  const { postId } = useParams();

  let post: Post = {} as Post;
  const { loading, data } = useQuery(GET_POST, {
    variables: {
      postId,
    },
  });

  if (data) {
    post = data.getPost;
  }

  return loading ? <p>Loading...</p> : post && <PostCard post={post} />;
};
