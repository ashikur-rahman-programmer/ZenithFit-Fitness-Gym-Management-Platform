"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Edit2,
  Trash2,
  Send,
  Check,
  X,
} from "lucide-react";

export default function PostInteractions({ postId }) {
  const [reaction, setReaction] = useState(null);
  const [likes, setLikes] = useState(12);
  const [dislikes, setDislikes] = useState(2);

  // কমেন্ট স্টেট
  const [comments, setComments] = useState([
    { id: 1, user: "Ashik", text: "Great post!", isOwner: true },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null); // এডিট মোড ট্র্যাক করার জন্য
  const [editText, setEditText] = useState("");

  // ১. লাইক/ডিসলাইক লজিক
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

  // ২. কমেন্ট পোস্ট করা
  const addComment = () => {
    if (!newComment.trim()) return;
    // TODO: BACKEND - এখানে POST /api/comments রিকোয়েস্ট পাঠাবেন
    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: newComment, isOwner: true },
    ]);
    setNewComment("");
  };

  // ৩. ডিলিট করা
  const deleteComment = (id) => {
    // TODO: BACKEND - এখানে DELETE /api/comments/${id} রিকোয়েস্ট পাঠাবেন
    setComments(comments.filter((c) => c.id !== id));
  };

  // ৪. এডিট সেভ করা
  const saveEdit = (id) => {
    // TODO: BACKEND - এখানে PUT/PATCH /api/comments/${id} রিকোয়েস্ট পাঠাবেন
    setComments(
      comments.map((c) => (c.id === id ? { ...c, text: editText } : c)),
    );
    setEditingId(null);
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

      {/* Comments List */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare /> Comments
        </h2>
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
            >
              {editingId === c.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-black p-2 rounded outline-none"
                  />
                  <button onClick={() => saveEdit(c.id)}>
                    <Check className="text-green-500" size={20} />
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    <X className="text-red-500" size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex-1">
                  <p className="text-xs text-white/40">{c.user}</p>
                  <p className="text-sm">{c.text}</p>
                </div>
              )}

              {c.isOwner && editingId !== c.id && (
                <div className="flex gap-3">
                  <Edit2
                    size={16}
                    className="cursor-pointer hover:text-white"
                    onClick={() => {
                      setEditingId(c.id);
                      setEditText(c.text);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="text-red-500 cursor-pointer hover:text-red-400"
                    onClick={() => deleteComment(c.id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <div className="mt-6 flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600"
            placeholder="Post a comment..."
          />
          <button
            onClick={addComment}
            className="bg-red-600 px-6 rounded-xl hover:bg-red-700 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
