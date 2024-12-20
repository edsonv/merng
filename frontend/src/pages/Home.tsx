import { GET_POSTS } from '@/graphql/Posts/getPosts';
import { Post } from '@/types/Post';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export const Home = (): JSX.Element => {
  const { error, loading, data } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <div>
      <h1 className='text-xl font-bold'>Recent Post</h1>
      <div className='grid grid-cols-3'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts &&
          posts.map((post) => {
            return <div>{post.body}</div>;
          })
        )}
      </div>
    </div>
  );
};
