import { DELETE_POST } from '@/graphql/Posts/deletePost';
import { GET_POSTS } from '@/graphql/Posts/getPosts';
import { Post } from '@/types/Post';
import { useMutation } from '@apollo/client';
import { Button } from '../Button/Button';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { DELETE_COMMENT } from '@/graphql/Posts/deleteComments';

type Props = {
  postId: string;
  commentId?: string;
  callback?: () => void;
};

export const DeleteButton = ({ postId, commentId, callback }: Props) => {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
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
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  const onClickDelete = () => {
    // TODO: open confirmation modal
    deletePostOrComment();
  };

  return (
    <Button
      type='button'
      className='bg-red-600 ml-auto'
      onClick={onClickDelete}
    >
      <DeleteIcon fill='white' />
    </Button>
  );
};
