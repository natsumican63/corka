import * as fs from 'fs';
import * as firebase from '@firebase/rules-unit-testing';
import { addDoc, collection, doc, getDoc } from '@firebase/firestore';

const projectID = 'corka-dev';
let testEnv: firebase.RulesTestEnvironment;
const uid = '123456678';
const otherUid = '4567892';
const groupId = 'mygroupid123456';
const otherGroupId = 'mygroupid789567';
const tokenOptions = { groupId, role: 'owner' };

beforeAll(async () => {
  // テストプロジェクト環境の作成
  testEnv = await firebase.initializeTestEnvironment({
    projectId: projectID,
    firestore: {
      rules: fs.readFileSync('./firestore.rules', 'utf8'),
      port: 8080,
      host: 'localhost',
    },
  });
});
// グローバルで定義されたbeforeAllはテストの開始前に一回実行されます。

beforeEach(async () => {
  // Firestore エミュレータ用に構成された projectId に属する Firestore データベースのデータをクリアします。
  await testEnv.clearFirestore();
});

// グローバルで定義されたbeforeEachは各テストの開始前に一回実行されます。

afterAll(async () => {
  //テスト終了後テスト環境で作成されたすべての RulesTestContexts を破棄します。
  await testEnv.cleanup();
});

const getDB = () => {
  // ログイン情報つきのContextを作成し、そこから Firestore インスタンスを得る。
  // authenticatedContextは引数をUIDにもつ認証済みContextを返す。
  const authenticatedContext = testEnv.authenticatedContext(uid, tokenOptions);
  const clientDB = authenticatedContext.firestore();

  // ゲストContextを作成し、そこから Firestore インスタンスを得る。
  // unauthenticatedContextは未認証Contextを返す。
  const unauthenticatedContext = testEnv.unauthenticatedContext();
  const guestClientDB = unauthenticatedContext.firestore();
  return { clientDB, guestClientDB };
};

describe('users collection', () => {
  it('自分のpostsのみgetできる', async () => {
    const authenticatedContext = testEnv.authenticatedContext(uid, tokenOptions);
    const db = authenticatedContext.firestore();
    await firebase.assertSucceeds(getDoc(doc(db, 'users', uid)));
  });

  it('自分のposts以外を取得しようとすると失敗する', async () => {
    const authenticatedContext = testEnv.authenticatedContext(uid, tokenOptions);
    const db = authenticatedContext.firestore();
    await firebase.assertFails(getDoc(doc(db, 'users', otherUid)));
  });

  it('自分のposts collectionにのみ追加できる', async () => {
    const authenticatedContext = testEnv.authenticatedContext(uid, tokenOptions);
    const db = authenticatedContext.firestore();
    await firebase.assertSucceeds(addDoc(collection(db, `users/${uid}/posts`), { title: 'hoge' }));
  });

  // it('自身の投稿以外にアクセスしようとすると失敗する', async () => {
  //   const authenticatedContext = testEnv.authenticatedContext(uid, tokenOptions);
  //   const db = authenticatedContext.firestore();
  //   await firebase.assertFails(getDoc(doc(db, 'users', otherUid)));
  // });
});
