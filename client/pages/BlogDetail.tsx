import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Share2, Loader2, Clock } from "lucide-react";
// Import đúng đường dẫn tới file lib vừa tạo
import { supabase } from "../lib/supabase";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Lấy chi tiết bài viết dựa trên ID từ URL
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Lỗi khi lấy chi tiết bài viết:", error.message);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Lỗi hệ thống:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Hiển thị trạng thái đang tải
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-cyan">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  // Hiển thị nếu không tìm thấy bài viết
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-black">
      <h1 className="text-2xl text-gray-400 mb-4 tracking-tighter italic">Oops! Không tìm thấy bài viết này.</h1>
      <Link to="/blog" className="px-6 py-2 bg-gray-100 rounded-full text-gray-900 hover:bg-cyan hover:text-white transition-all font-bold">
        Quay lại danh sách
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Thanh điều hướng cố định phía trên */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50 px-6 md:px-20 py-4">
        <Link to="/blog" className="flex items-center gap-2 text-gray-400 hover:text-cyan font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
          <ArrowLeft size={16} /> TRỞ LẠI BLOG
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 pt-16">
        <header className="space-y-6 mb-12">
          {/* Thông tin meta bài viết */}
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-cyan">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} /> 
              {new Date(post.created_at).toLocaleDateString('vi-VN')}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} /> 
              {post.read_time || "5 MIN READ"}
            </div>
          </div>

          {/* Tiêu đề bài viết */}
          <h1 className="text-5xl md:text-6xl font-black text-gray-950 leading-[1.1] tracking-tighter">
            {post.title}
          </h1>

          {/* Thông tin tác giả và nút chia sẻ */}
          <div className="flex items-center justify-between py-8 border-y border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-950 flex items-center justify-center text-white font-black">
                {post.author ? post.author[0].toUpperCase() : 'X'}
              </div>
              <div>
                <p className="text-sm font-black text-gray-950">{post.author || "Admin"}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tác Giả</p>
              </div>
            </div>
            <button className="p-3 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-cyan">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        {/* Nội dung bài viết */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed font-medium whitespace-pre-line">
            {post.content}
          </p>
        </div>

        {/* Phần kết bài */}
        <footer className="mt-20 pt-12 border-t border-gray-100">
           <div className="p-10 bg-gray-50 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                 <h4 className="text-xl font-black text-gray-950 tracking-tight">Thích bài viết này?</h4>
                 <p className="text-gray-500 font-medium">Đăng ký để nhận thông báo về những bài viết mới nhất của mình nhé.</p>
              </div>
              <button className="px-8 py-4 bg-gray-950 text-white font-black rounded-2xl hover:bg-cyan transition-all text-xs uppercase tracking-widest">
                Đăng ký ngay
              </button>
           </div>
        </footer>
      </article>
    </div>
  );
}