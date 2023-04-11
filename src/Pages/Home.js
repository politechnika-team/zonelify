import { useState, useEffect, useContext } from "react";
<<<<<<< HEAD

=======
>>>>>>> d6ccc847dff4bbf93f864837703bc931d28d4537
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../css/Home.css";

export default function MainSite() {
  const { currentUser } = useContext(AuthContext);

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
              content={post.content}
              username={post.username}
              photoURL={post.photoURL}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
