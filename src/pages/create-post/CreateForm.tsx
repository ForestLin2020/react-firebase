import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import * as  yup from 'yup';


interface CreateFormData {
  title: string;
  description: string;
}


export const CreateForm = () => {
  // step1. create schema for check input in react: yup
  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  });

  // step2. using useForm hook to connect both schema and input form
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  })

  // step4. define which collection in firestore is going to save the data from this component
  const postsRef = collection( db, "posts");
  const [ user ] = useAuthState(auth);
  const navigate = useNavigate();

  // step3. using handleSubmit from step2 to "handle from submit" button and fetch "data"
  // step2 + step3: handleSubmit(onCreatePost) -> onCreatePost = (data) => { ... }
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid
    })
    navigate('/');
  }

  return (
    // step2 + step3: handleSubmit(onCreatePost) 
    <form onSubmit={handleSubmit(onCreatePost)}> 
      <input placeholder="Title..." {...register('title')} />
      <p style={{ color: 'red' }}>{ errors.title?.message }</p>
      <textarea placeholder="Description..." {...register('description')} />
      <p style={{ color: 'red' }}>{ errors.description?.message }</p>
      <input className="submitForm" type='submit' />
    </form>
  )  
}