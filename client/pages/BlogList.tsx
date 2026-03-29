import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
// Import supabase từ tệp lib vừa tạo
import { supabase } from "../lib/supabase";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy dữ liệu thực tế từ cơ sở dữ liệu Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Truy vấn bảng 'posts', sắp xếp theo thời gian tạo mới nhất (created_at)
        const { data, error } = await supabase
          .from('posts') 
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Lỗi khi truy vấn dữ liệu:", error.message);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error("Lỗi hệ thống không mong muốn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-cyan">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-8 md:p-20 font-sans">
      {/* Nút quay lại trang chủ Portfolio */}
      <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-cyan mb-12 font-black text-xs uppercase tracking-widest transition-colors">
        <ArrowLeft size={18} /> Quay lại Portfolio
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-6xl font-black text-gray-950 tracking-tighter mb-4 italic">
            Blog <span className="text-cyan">Post</span>
          </h1>
          <div className="h-2 w-20 bg-cyan"></div>
        </header>

        {/* Kiểm tra nếu danh sách trống */}
        {posts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Chưa có bài viết nào được tìm thấy trong Database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post: any) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                <article className="space-y-4">
                  {/* Ảnh đại diện bài viết (sử dụng ảnh ngẫu nhiên từ Unsplash làm placeholder) */}
                  <div className="overflow-hidden rounded-2xl bg-gray-100 aspect-video mb-4">
                    <img 
                      src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80`} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  
                  {/* Tiêu đề bài viết */}
                  <h2 className="text-2xl font-black text-gray-950 group-hover:text-cyan transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h2>
                  
                  {/* Đoạn trích dẫn hoặc nội dung tóm tắt */}
                  <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt || (post.content ? post.content.substring(0, 120) + "..." : "Nội dung bài viết đang được cập nhật.")}
                  </p>
                  
                  {/* Nút đọc thêm */}
                  <div className="flex items-center gap-2 text-cyan font-black text-[10px] uppercase tracking-[0.2em] pt-2">
                    Xem Chi Tiết <BookOpen size={14} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}