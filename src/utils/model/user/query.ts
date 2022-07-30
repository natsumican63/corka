import { signInAnonymously } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

export function useUser() {
  const [user, loading] = useAuthState(auth, {
    // onUserChanged: async (changedUser) => {
    //   await signInAnonymously(auth);
    // },
  });
  return { user, loading };
}
