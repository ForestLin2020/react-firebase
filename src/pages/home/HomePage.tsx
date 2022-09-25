//step1. getting data from firebase
import { getDocs, collection, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { Post } from './Post';

// step2. using a state to keep tracking the data that we get back 
import { useEffect, useState } from 'react';


export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const HomePage = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  
  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <div>
      { postsList?.map((post) => (
        <Post post={post}/>
      )) }
    </div>
  )
}
