import { FirebaseError } from 'firebase/app';
import { addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { fetchOgp } from '../../fetchOgp';
import { useUser } from '../user/query';
import { getPostsCollectionRef } from '../refs';

export type Mutation<MutationVariableObj, MutationResponseObj> = [
  (args: MutationVariableObj) => Promise<MutationResponseObj | void>,
  { loading: boolean; error?: FirebaseError }
];

export function useAddPostMutation(): Mutation<{ url: string }, void> {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const postsRef = getPostsCollectionRef(user?.uid);
  const func = async ({ url }: { url: string }) => {
    setLoading(true);
    const res = await fetchOgp(url);
    await addDoc(postsRef, res);
    setLoading(false);
  };
  return [func, { loading }];
}
