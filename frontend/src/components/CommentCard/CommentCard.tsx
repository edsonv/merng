import { useAuthContext } from '@/hooks/useAuthContext';
import { Comment } from '@/types/Post';
import moment from 'moment';
import { DeleteButton } from '../DeleteButton/DeleteButton';

type Props = {
  comment: Comment;
  postId: string;
};

export const CommentCard = ({
  comment: { id, username, createdAt, body },
  postId,
}: Props) => {
  const { user } = useAuthContext();
  return (
    <div
      className='border border-gray-400 rounded p-2 flex items-start'
      key={id}
    >
      <div className='flex flex-col gap-2 px-2 mb-4 flex-grow'>
        <div>
          <h2 className='font-bold text-lg'>{username}</h2>
          <div className='text-gray-500 text-sm'>
            {moment(createdAt).fromNow()}
          </div>
        </div>
        <div>{body}</div>
      </div>

      {user && user.username === username && (
        <div className='mt-2'>
          <DeleteButton postId={postId} commentId={id} />
        </div>
      )}
    </div>
  );
};
