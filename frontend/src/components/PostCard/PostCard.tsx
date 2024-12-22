import { Post } from '@/types/Post';
import moment from 'moment';
import { Link } from 'react-router';
import { HeartIcon } from '../HeartIcon/HeartIcon';
import { MouseEventHandler } from 'react';
import { CommentIcon } from '../CommentIcon/CommentIcon';

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes } =
    post;

  const likePost: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('post liked');
  };

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
        <button className='flex relative' onClick={likePost}>
          <div className='flex items-center py-2 px-4 pr-7 border border-red-600 rounded rounded-r-none border-r-0'>
            <HeartIcon fill='rgb(220 38 38)' size={4} />
          </div>
          <div className='flex -ml-3'>
            <div className='mt-3 inline-block overflow-hidden'>
              <div className='h-3 w-3 border border-red-600 origin-top-right -rotate-45 transform bg-white'></div>
            </div>

            <div className='-ml-[1px] flex border border-red-600 rounded rounded-l-none py-2 px-4 text-red-600'>
              {likeCount}
            </div>
          </div>
        </button>
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
      </div>
    </div>
  );
};
