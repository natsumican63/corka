import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { firestore } from './config';

export type Post = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
};

export function getPostsCollectionRef(uid?: string): CollectionReference<Partial<Post>> {
  return collection(firestore, `users/${uid}/posts`);
}

export function getPostDocRef(uid: string, postId: string): DocumentReference<Partial<Post>> {
  return doc(firestore, `users/${uid}/posts`, postId);
}

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Post>, options: SnapshotOptions): Post {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      url: data.url,
      image: data.image,
    };
  },
};
