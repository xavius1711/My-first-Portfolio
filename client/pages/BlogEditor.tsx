import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Save, Loader2, X, AlertCircle } from "lucide-react";
// Đảm bảo tệp này đã được tạo ở bước trên
import { supabase } from "../lib/supabase";

/**
 * Trang soạn thảo bài viết Blog dành cho Admin.
 * Yêu cầu: Đã cài đặt @clerk/clerk-react và cấu hình Supabase.
 */
export default function BlogEditor() {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  
  // Quản lý trạng thái form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // KIỂM TRA QUYỀN ADMIN: Thay email của bạn vào đây
  const ADMIN_EMAIL = "xavius1707@gmail.com"; 
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  // Chờ Clerk tải thông tin người dùng
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan" size={32} />
      </div>
    );
  }

  // Nếu chưa đăng nhập hoặc không phải Admin, quay về trang chủ
  if (!isSignedIn || !isAdmin) {
    return <Navigate to="/" />;
  }

  /**
   * Xử lý đăng bài viết lên Supabase
   */
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim() || !content.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết.");
      return;
    }
    
    setIsPublishing(true);
    
    try {
      const { error } = await supabase
        .from('posts')
        .insert([{ 
          title: title.trim(), 
          content: content.trim(), 
          excerpt: content.substring(0, 150) + "...", 
          author: user.fullName || "Admin",
          created_at: new Date().toISOString()
        }]);

      if (error) {
        throw new Error(error.message);
      }

      // Thông báo thành công và chuyển hướng
      alert("Đã đăng bài viết thành công!");
      navigate("/blog"); 
    } catch (err: any) {
      setErrorMsg("Lỗi khi lưu bài viết: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-20 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative">
        {/* Nút đóng/quay lại */}
        <button 
          onClick={() => navigate("/blog")} 
          className="absolute right-8 top-12 text-gray-300 hover:text-gray-950 transition-colors"
          title="Đóng trình soạn thảo"
        >
          <X size={24} />
        </button>
        
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter">
            Soạn Thảo <span className="text-cyan italic">Bài Viết</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium italic">Viết nên những chia sẻ tuyệt vời của bạn.</p>
        </header>
        
        {/* Hiển thị lỗi nếu có */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold text-sm">
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}
        
        <form onSubmit={handlePublish} className="space-y-6">
          {/* Nhập tiêu đề */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-2">
              Tiêu Đề Bài Viết
            </label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-cyan transition-all outline-none"
              placeholder="Nhập tiêu đề ấn tượng..."
            />
          </div>

          {/* Nhập nội dung */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-2">
              Nội Dung Chi Tiết
            </label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl h-80 font-medium focus:ring-2 focus:ring-cyan transition-all resize-none outline-none leading-relaxed"
              placeholder="Kể câu chuyện hoặc hướng dẫn kỹ thuật của bạn tại đây..."
            />
          </div>

          {/* Nút gửi */}
          <button 
            type="submit"
            disabled={isPublishing}
            className="w-full py-5 bg-cyan text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-cyan/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-[0.98] disabled:opacity-50"
          >
            {isPublishing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Save size={18} /> ĐĂNG BÀI NGAY
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}