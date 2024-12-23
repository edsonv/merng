import { Link } from 'react-router';
import { CommentIcon } from '../CommentIcon/CommentIcon';

type Props = {
  commentCount: number;
  postId: string;
};

export const CommentButton = ({ commentCount, postId }: Props) => {
  return (
    <Link className='flex relative' to={`/posts/${postId}`}>
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
    </Link>
  );
};
