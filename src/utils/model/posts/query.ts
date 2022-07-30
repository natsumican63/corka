import { query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useUser } from '../user/query';
import { getPostsCollectionRef, postConverter } from '../refs';

export function usePosts() {
  const { user } = useUser();
  const postsRef = getPostsCollectionRef(user?.uid);
  const q = query(postsRef);
  const [data, loading, error] = useCollectionData(q.withConverter(postConverter));

  return { data, loading, error };
}
