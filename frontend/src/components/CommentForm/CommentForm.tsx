import { CREATE_COMMENT } from '@/graphql/Posts/submitComment';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useMutation } from '@apollo/client';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { FormInput } from '../FormInput/FormInput';

type Props = {
  postId: string;
};
export const CommentForm = ({ postId }: Props) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState('');
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment('');
      commentInputRef.current!.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setComment(target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    createComment();
  };

  return (
    user && (
      <div className='border border-gray-400 rounded p-4'>
        <h2 className='font-bold text-lg mb-2'>Post a comment</h2>
        <form
          className='flex flex-col gap-4 mb-4'
          onSubmit={(event) => event.preventDefault()}
        >
          <FormInput
            type='text'
            id='comment'
            placeholder='Comment...'
            onChange={handleChange}
            value={comment}
            ref={commentInputRef}
          />
          <Button
            type='submit'
            disabled={comment.trim() === ''}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  );
};
