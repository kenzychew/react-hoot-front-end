import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";

const HootDetails = (props) => {
  const { hootId } = useParams();
  const { user } = useContext(UserContext);
  const [hoot, setHoot] = useState();
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    const fetchHoot = async () => {
      try {
        const hootData = await hootService.show(hootId);
        console.log("hootData", hootData);
        setHoot(hootData);
      } catch (error) {
        setMessage(error.message);
      }
    };
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await hootService.deleteComment(hootId, commentId);
      setHoot({
        ...hoot,
        comments: hoot.comments.filter((c) => c._id !== commentId)
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!hoot) return <main>{message}</main>;

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <Outlet />
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteHoot(hootId)}>
                Delete
              </button>
            </>
          )}
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>

        <Link to="comments/new">
          <button>Add Comments</button>
        </Link>

        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
              {comment.author._id === user._id && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete Comment
                </button>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
