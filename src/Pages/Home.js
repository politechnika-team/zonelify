import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function MainSite({ photoURL, currentUser }) {
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mainsite-container">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <h1>Home</h1>
        </div>
        <CreatePost photoURL={photoURL} currentUser={currentUser} />
        <div className="post-container">
          {/*tweet section printed from firebase */}
          {postsList?.map((post) => (
            <Post
              key={post.id}
              content={post.content}
              username={post.username}
              photoURL={post.photoURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
