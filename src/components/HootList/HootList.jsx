// src/components/HootList/HootList.jsx

import { Link } from "react-router";

const HootList = ({ hoots }) => {
  if (hoots.length === 0) {
    return <main>No Hoots</main>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) 
      ? date.toLocaleDateString()
      : 'Invalid date';
  };

  return (
    <main>
      {hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <p>
                {`${hoot.author?.username || 'Unknown user'} posted on
                ${formatDate(hoot.createdAt)}`}
              </p>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default HootList;
