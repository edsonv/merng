import { useAuthContext } from '@/hooks/useAuthContext';
import { Post } from '@/types/Post';
import moment from 'moment';
import { Link, useNavigate } from 'react-router';
import { CommentButton } from '../CommentButton/CommentButton';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { LikeButton } from '../LikeButton/LikeButton';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { body, createdAt, id, username, likeCount, commentCount, likes } =
    post;

  function deletePost() {
    navigate('/');
  }

  return (
    <div className='border border-gray-400 rounded p-2'>
      <div className='flex flex-col gap-2 px-2 mb-4'>
        <div>
          <h2 className='font-bold text-lg'>{username}</h2>
          <Link to={`/posts/${id}`} className='text-gray-500 text-sm'>
            {moment(createdAt).fromNow(true)}
          </Link>
        </div>
        <div>{body}</div>
      </div>
      <hr />
      <div className='flex gap-2 px-2 my-4'>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <CommentButton commentCount={commentCount} postId={id} />
        {user?.username === username && (
          <DeleteButton postId={id} callback={deletePost} />
        )}
      </div>
    </div>
  );
};
