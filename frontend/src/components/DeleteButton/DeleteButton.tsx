import { DELETE_POST } from '@/graphql/Posts/deletePost';
import { useMutation } from '@apollo/client';
import { Button } from '../Button/Button';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { GET_POSTS } from '@/graphql/Posts/getPosts';
import { Post } from '@/types/Post';

type Props = {
  postId: string;
  callback?: () => void;
};

export const DeleteButton = ({ postId, callback }: Props) => {
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      // TODO: close confirmation modal
      // { implement here }
      
      // TODO: remove post from cache
      const { getPosts } = proxy.readQuery({
        query: GET_POSTS,
      }) as { getPosts: Post[] };
      
      const filteredPosts = getPosts.filter((post) => post.id !== postId);

      const newData = { getPosts: filteredPosts };

      proxy.writeQuery({
        query: GET_POSTS,
        data: newData,
      });

      if (callback) callback();
    },
    variables: {
      postId,
    },
  });
  const onDeletePost = () => {
    // TODO: open confirmation modal
    deletePost();
  };

  return (
    <Button type='button' className='bg-red-600 ml-auto' onClick={onDeletePost}>
      <DeleteIcon fill='white' />
    </Button>
  );
};
