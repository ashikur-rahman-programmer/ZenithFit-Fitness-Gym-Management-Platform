"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Edit2,
  Trash2,
  Send,
} from "lucide-react";

export default function PostInteractions({ postId }) {
  const [reaction, setReaction] = useState(null);
  const [likes, setLikes] = useState(12);
  const [dislikes, setDislikes] = useState(2);
  const [comments, setComments] = useState([
    { id: 1, user: "Ashik", text: "Great post!", isOwner: true },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleReaction = (type) => {
    if (reaction === type) {
      setReaction(null);
      type === "like" ? setLikes((l) => l - 1) : setDislikes((d) => d - 1);
    } else {
      if (reaction === "like") setLikes((l) => l - 1);
      if (reaction === "dislike") setDislikes((d) => d - 1);
      setReaction(type);
      type === "like" ? setLikes((l) => l + 1) : setDislikes((d) => d + 1);
    }
  };

  return (
    <div className="bg-[#111111] p-8 rounded-3xl border border-white/10 space-y-8">
      {/* Interaction Buttons */}
      <div className="flex items-center gap-6 border-b border-white/10 pb-6">
        <button
          onClick={() => handleReaction("like")}
          className={`flex items-center gap-2 ${reaction === "like" ? "text-red-500 font-bold" : "text-white/60"}`}
        >
          <ThumbsUp size={20} /> Like ({likes})
        </button>
        <button
          onClick={() => handleReaction("dislike")}
          className={`flex items-center gap-2 ${reaction === "dislike" ? "text-blue-500 font-bold" : "text-white/60"}`}
        >
          <ThumbsDown size={20} /> Dislike ({dislikes})
        </button>
      </div>

      {/* Comments */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare /> Comments
        </h2>
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 p-4 rounded-xl flex justify-between"
            >
              <p className="text-sm">{c.text}</p>
              {c.isOwner && (
                <div className="flex gap-2">
                  <Edit2 size={16} className="cursor-pointer" />
                  <Trash2 size={16} className="text-red-500 cursor-pointer" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600"
            placeholder="Post a comment..."
          />
          <button className="bg-red-600 px-6 rounded-xl">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
