import {
  AuthError,
  EmailAuthProvider,
  linkWithCredential,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config';

type AuthActionHook<M> = [M, { loading: boolean; error: AuthError | undefined }];

type SignUpMutation = AuthActionHook<() => Promise<void>>;
type SignInMutation = AuthActionHook<(args: { email: string; password: string }) => Promise<void>>;

export function useSignUpMutation(): SignUpMutation {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState(false);

  const func = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  return [func, { loading, error }];
}

export function useSignInMutation(): SignInMutation {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState(false);

  const func = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  return [func, { loading, error }];
}

export function useLinkingAccoutMutation(): AuthActionHook<
  (args: { email: string; password: string }) => Promise<void>
> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | undefined>(undefined);

  const func = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    try {
      const credential = await EmailAuthProvider.credential(email, password);
      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential);
      }
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  return [func, { loading, error }];
}
