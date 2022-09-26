import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <div className="mb-4">
                <span className="font-semibold">
                  {comment.node.author.node.name}
                </span>{" "}
                on {moment(comment.node.date).format("MMM DD, YYYY")}
              </div>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.node.content)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
