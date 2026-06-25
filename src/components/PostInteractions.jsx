"use client";
import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Edit2,
  Trash2,
  Send,
  Check,
  X,
  MessageSquare,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AVATAR_COLORS = [
  "bg-red-600",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-600",
  "bg-blue-600",
  "bg-violet-600",
  "bg-pink-600",
];

const getInitial = (email) => (email ? email.charAt(0).toUpperCase() : "?");
const getAvatarColor = (email) =>
  AVATAR_COLORS[email ? email.charCodeAt(0) % AVATAR_COLORS.length : 0];

export default function PostInteractions({ postId, initialData, userEmail }) {
  const [comments, setComments] = useState(initialData?.comments || []);
  const [likes, setLikes] = useState(
    Array.isArray(initialData?.likes) ? initialData.likes : [],
  );
  const [dislikes, setDislikes] = useState(
    Array.isArray(initialData?.dislikes) ? initialData.dislikes : [],
  );
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [reactionLoading, setReactionLoading] = useState(null);

  const handleReaction = async (type) => {
    // jwt authentication
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    if (!userEmail) return alert("Login to vote");
    setReactionLoading(type);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postId}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type, userEmail }),
        },
      );
      const data = await res.json();
      setLikes(data.likes || []);
      setDislikes(data.dislikes || []);
    } finally {
      setReactionLoading(null);
    }
  };

  const saveEdit = async (id) => {
    // jwt authentication
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newText: editText }),
      },
    );
    if (res.ok) {
      setComments(
        comments.map((c) => (c._id === id ? { ...c, text: editText } : c)),
      );
      setEditingId(null);
    }
  };

  const deleteComment = async (id) => {
    // jwt authentication
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.ok) setComments(comments.filter((c) => c._id !== id));
  };

  const addComment = async () => {
    // jwt authentication
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    if (!newComment.trim()) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment, authorEmail: userEmail }),
      },
    );

    if (res.status === 403) {
      toast.error("Action restricted by Admin");
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setComments([...comments, data]);
      setNewComment("");
    }
  };

  const userLiked = likes.includes(userEmail);
  const userDisliked = dislikes.includes(userEmail);

  return (
    <div className="space-y-6 font-sans">
      {/* ── Reactions ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleReaction("like")}
          disabled={reactionLoading !== null}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all duration-200
            ${
              userLiked
                ? "border-red-500/50 bg-red-500/10 text-red-400 font-semibold"
                : "border-white/8 bg-white/4 text-white/40 hover:text-white/70"
            }`}
        >
          <ThumbsUp size={14} strokeWidth={userLiked ? 2.5 : 1.8} />
          {likes.length}
        </button>

        <button
          onClick={() => handleReaction("dislike")}
          disabled={reactionLoading !== null}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all duration-200
            ${
              userDisliked
                ? "border-indigo-400/50 bg-indigo-500/10 text-indigo-400 font-semibold"
                : "border-white/8 bg-white/4 text-white/40 hover:text-white/70"
            }`}
        >
          <ThumbsDown size={14} strokeWidth={userDisliked ? 2.5 : 1.8} />
          {dislikes.length}
        </button>

        <div className="ml-auto flex items-center gap-1.5 text-white/25 text-sm">
          <MessageSquare size={13} strokeWidth={1.5} />
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.06]" />

      {/* ── Comments ── */}
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 items-start bg-white/[0.025] border border-white/[0.07] rounded-2xl px-4 py-3.5"
            >
              {/* Avatar */}
              <div
                className={`${getAvatarColor(c.authorEmail)} w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5`}
              >
                {getInitial(c.authorEmail)}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                {editingId === c._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(c._id)}
                      autoFocus
                      className="flex-1 bg-black/40 border border-red-500/40 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-red-500"
                    />
                    <button
                      onClick={() => saveEdit(c._id)}
                      className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 hover:bg-green-500/20 transition"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest truncate">
                        {c.authorEmail}
                      </span>
                      {c.authorEmail === userEmail && (
                        <div className="flex gap-2 ml-3 shrink-0">
                          <button
                            onClick={() => {
                              setEditingId(c._id);
                              setEditText(c.text);
                            }}
                            className="text-white/25 hover:text-white/80 transition-colors"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => deleteComment(c._id)}
                            className="text-red-500/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed break-words">
                      {c.text}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white/20 text-sm py-6">
          No comments yet. Be the first.
        </p>
      )}

      {/* ── Input ── */}
      <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-4 pr-1.5 py-1.5 focus-within:border-red-500/40 transition-colors">
        {userEmail && (
          <div
            className={`${getAvatarColor(userEmail)} w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
          >
            {getInitial(userEmail)}
          </div>
        )}
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          placeholder={userEmail ? "Add a comment…" : "Login to comment"}
          disabled={!userEmail}
          className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none py-2 caret-red-500"
        />
        <button
          onClick={addComment}
          disabled={!newComment.trim()}
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0
            ${
              newComment.trim()
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-white/[0.06] text-white/20 cursor-default"
            }`}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
