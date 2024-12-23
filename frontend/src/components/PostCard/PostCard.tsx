import { Post } from '@/types/Post';
import moment from 'moment';
import { Link } from 'react-router';
import { MouseEventHandler } from 'react';
import { CommentIcon } from '../CommentIcon/CommentIcon';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { Button } from '../Button/Button';
import { LikeButton } from '../LikeButton/LikeButton';
import { useAuthContext } from '@/hooks/useAuthContext';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const { user } = useAuthContext();
  const { body, createdAt, id, username, likeCount, commentCount, likes } =
    post;

  const commentPost: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('post commented');
  };

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
        <button className='flex relative' onClick={commentPost}>
          <div className='flex items-center py-2 px-4 pr-7 border border-blue-400 rounded rounded-r-none border-r-0'>
            <CommentIcon fill='rgb(96 165 250)' size={4} />
          </div>
          <div className='flex -ml-3'>
            <div className='mt-3 inline-block overflow-hidden'>
              <div className='h-3 w-3 border border-blue-400 origin-top-right -rotate-45 transform bg-white'></div>
            </div>

            <div className='-ml-[1px] flex border border-blue-400 rounded rounded-l-none py-2 px-4 text-blue-400'>
              {commentCount}
            </div>
          </div>
        </button>
        <Button type='button' className='bg-red-600 ml-auto'>
          <DeleteIcon fill='white' />
        </Button>
      </div>
    </div>
  );
};
