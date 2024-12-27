import { CommentCard } from '@/components/CommentCard/CommentCard';
import { CommentForm } from '@/components/CommentForm/CommentForm';
import { PostCard } from '@/components/PostCard/PostCard';
import { GET_POST } from '@/graphql/Posts/getPost';
import { Post } from '@/types/Post';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

export const SinglePost = () => {
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

  return (
    <div className='grid grid-cols-12'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='col-span-2'></div>
          <div className='col-span-10'>
            {post && (
              <div className='flex flex-col gap-6'>
                <PostCard post={post} />
                <CommentForm postId={post.id} />
                {post.comments.map((comment) => (
                  <CommentCard comment={comment} postId={post.id} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
