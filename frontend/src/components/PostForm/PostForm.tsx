import { useForm } from '@/hooks/useForm';
import { FormInput } from '../FormInput/FormInput';

import { Button } from '../Button/Button';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/Posts/createPost';
import { GET_POSTS } from '@/graphql/Posts/getPosts';
import { Post } from '@/types/Post';

export const PostForm = () => {
  const { onSubmit, onChange, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS,
      }) as { getPosts: Post[] };
      console.log(result);

      const newData = { getPosts: [result.data.createPost, ...data.getPosts] };

      proxy.writeQuery({
        query: GET_POSTS,
        data: newData,
      });

      values.body = '';
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5 items-start'>
      <FormInput
        type='text'
        id='body'
        placeholder='Hi world!'
        onChange={onChange}
        value={values.body}
      >
        Create a post:
      </FormInput>
      <Button type='submit' disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
