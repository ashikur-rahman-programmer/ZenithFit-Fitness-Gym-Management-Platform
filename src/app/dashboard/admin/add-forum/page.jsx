import AddForumAdmin from "@/components/dashboard/admin/AddForumAdmin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  // সিকিউরিটি চেক
  if (!session) {
    return <p className="text-center text-white mt-10">Unauthorized access.</p>;
  }

  // ইউজার ডাটা চাইল্ড কম্পোনেন্টে পাস করা হচ্ছে
  return <AddForumAdmin user={session.user} />;
}

// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { MessageSquareText, FileText, Upload, Send } from "lucide-react";
// import { toast } from "react-toastify";

// export default function AdminAddForumPost() {
//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     description: "",
//   });
//   const [uploading, setUploading] = useState(false);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const formDataImg = new FormData();
//     formDataImg.append("image", file);

//     try {
//       const response = await fetch(
//         `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
//         { method: "POST", body: formDataImg },
//       );
//       const data = await response.json();
//       if (data.success) {
//         setFormData({ ...formData, image: data.data.url });
//         toast.success("Image uploaded successfully!");
//       }
//     } catch (error) {
//       toast.error("Image upload failed!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Admin Posting to Forum:", formData);
//     toast.success("Forum post published successfully!");
//   };

//   const inputClass =
//     "w-full bg-[#111111] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-white/20";
//   const iconClass = "absolute left-3 top-3.5 text-white/30";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-2xl mx-auto space-y-8"
//     >
//       <div>
//         <h1 className="text-2xl font-bold text-white">Create Forum Post</h1>
//         <p className="text-white/50 text-sm">
//           Contribute to the community as an Admin.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-6"
//       >
//         {/* Title */}
//         <div>
//           <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
//             Post Title
//           </label>
//           <div className="relative">
//             <MessageSquareText className={iconClass} size={18} />
//             <input
//               required
//               type="text"
//               className={inputClass}
//               placeholder="Enter an official title..."
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
//             Upload Image
//           </label>
//           <div className="relative">
//             <Upload className={iconClass} size={18} />
//             <input
//               type="file"
//               onChange={handleImageUpload}
//               className={`${inputClass} file:bg-blue-600 file:border-none file:text-white file:rounded-lg file:py-1 file:px-2`}
//             />
//           </div>
//           {uploading && (
//             <p className="text-blue-500 text-xs mt-2">Uploading to ImgBB...</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
//             Description
//           </label>
//           <div className="relative">
//             <FileText className={iconClass} size={18} />
//             <textarea
//               required
//               rows="6"
//               className={inputClass}
//               placeholder="Write the announcement or post content here..."
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
//         >
//           Publish Official Post <Send size={18} />
//         </button>
//       </form>
//     </motion.div>
//   );
// }
