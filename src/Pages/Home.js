import { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import {
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../css/Home.css";
import "../css/Post.css";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(
      query(
        postsRef,
        orderBy("creationDate", "desc"),
        orderBy("creationHour", "desc")
      )
    );
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    // Listen for changes in the posts collection
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      setPostsList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {}, [postsList]);

  return (
    <div className="pages-container">
      <div className="home-container">
        <div className="home-header">
          <h1>Home</h1>
        </div>
        <CreatePost
          photoURL={currentUser?.photoURL}
          currentUser={currentUser}
        />
        <div className="post-container">
          {/*tweet section printed from firebase */}
          {postsList?.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              creatorId={post.userId}
              content={post.content}
              username={post.username}
              photoURL={post.photoURL}
              currentUser={currentUser}
              creationDate={post.creationDate}
              creationHour={post.creationHour}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
