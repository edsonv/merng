import { Post } from '@/types/Post';
import { HeartIcon } from '../HeartIcon/HeartIcon';
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '@/graphql/Posts/likePost';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserData } from '@/types/User';

type Props = {
  user?: UserData | null;
  post: Partial<Post>;
};

export const LikeButton = ({ user, post: { id, likes, likeCount } }: Props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(true);
  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: id,
    },
  });

  const onLikePost = () => {
    if (user) {
      likePost();
    } else {
      navigate('login');
    }
  };

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likedStyles =
    user && liked
      ? {
          background: 'bg-green-600',
          fill: 'white',
        }
      : {
          background: 'bg-white',
          fill: 'rgb(22 163 74)',
        };

  return (
    <button className='flex relative' onClick={onLikePost}>
      <div
        className={`flex items-center py-2 px-4 pr-7 border border-green-600 rounded rounded-r-none border-r-0 ${likedStyles.background}`}
      >
        <HeartIcon fill={likedStyles.fill} size={4} />
      </div>
      <div className='flex -ml-3'>
        <div className='mt-3 inline-block overflow-hidden'>
          <div className='h-3 w-3 border border-green-600 origin-top-right -rotate-45 transform bg-white'></div>
        </div>

        <div className='-ml-[1px] flex border border-green-600 rounded rounded-l-none py-2 px-4 text-green-600'>
          {likeCount}
        </div>
      </div>
    </button>
  );
};
