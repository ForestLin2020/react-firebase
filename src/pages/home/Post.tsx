import { Post as interfacePost } from './HomePage';
import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: interfacePost;
}

interface Like {
  likeId: string
  userId: string;
}



export const Post = (props: Props) => {
  const { post } = props;

  // step1. select collection 
  const likesRef = collection(db, "likes");
  const [ user ] = useAuthState(auth);
  const [ likes, setLikes] = useState<Like[] | null>(null);
  
  const addLike = async () => {
    // try and catch: making sure both adding like into firebase collection and UI success together  
    try { 
      // step2. enable like button
      const newDoc = await addDoc(likesRef, {
        postId: post.id,
        userId: user?.uid
      })
      // step6. update likes list automatically when user add like
      if (user) {
        setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }] )
      }
    } catch (error) {
      console.log(error);
    }
  }

  // step7. disable like button
  const removeLike = async () => {
    // try and catch: making sure both adding like into firebase collection and UI success together  
    try {
      // query out the post to delete
      const likeToDeleteQuery = query(
        likesRef, 
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      ); 
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes", likeId)
      await deleteDoc(likeToDelete);

      // update likes list automatically when user add like
      if (user) {
        setLikes((prev) => prev && prev?.filter((like)=> like.likeId !== likeId) )
      }
    } catch (error) {
      console.log(error);
    }
  }

  // step3. query when current post.id match postId in likes collection
  const likesDoc = query(likesRef, where("postId", "==", post.id)); 

  const getLikes = async() => {
    // step4. query out from likes collection
    const data = await getDocs(likesDoc); 
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    
    // step5. counting likes number 
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })) as Like[]
    )
    
  }

  // step5. checking if user like this post or not, to enable heart or disable heart button
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  useEffect(()=>{
    getLikes();
  }, []);

  return (
    <div>
      <div className='title'>
        <h1>{ post.title }</h1>
      </div>
      <div className='body'>
        <p>{ post.description }</p>
      </div>
      <div className='footer'>
        <p>@{ post.username }</p>
        {/* Emoji Chart - Smileys & People */}
        <button onClick={ hasUserLiked ? removeLike : addLike }> { hasUserLiked ? <>&#128150;</> : <>&#10084;</> } </button>
        { likes && <p>Likes: { likes?.length } </p> }
      </div>
      <hr />
    </div>
  )
}