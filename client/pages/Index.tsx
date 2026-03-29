import { Link } from "react-router-dom";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Github, Linkedin, Facebook, BookOpen, ArrowRight, Code2, Server, Database, Layout, Smartphone, Terminal } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white selection:bg-cyan/30">
      {/* 1. HEADER - Full Logic Clerk */}
      <nav className="flex h-20 items-center justify-between px-6 md:px-20 lg:px-[120px] sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-cyan animate-pulse" />
          <span className="text-xl font-extrabold text-gray-950 tracking-tighter">Xeon.tech</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
            <Link to="/" className="text-cyan">Home</Link>
            <Link to="/blog" className="text-gray-900 hover:text-cyan transition-colors">Blog</Link>
            <a href="#skills" className="text-gray-900 hover:text-cyan transition-colors">Skills</a>
            <a href="#projects" className="text-gray-900 hover:text-cyan transition-colors">Projects</a>
          </div>

          <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2.5 bg-gray-950 text-white text-xs font-black rounded-full hover:bg-cyan transition-all uppercase tracking-widest shadow-lg">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link to="/blog/editor" className="text-xs font-black uppercase text-gray-500 hover:text-cyan transition-colors">Editor</Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION - Khối Rubik 110% chuẩn Screenshot */}
      <section className="px-6 md:px-20 lg:px-[120px] py-16 lg:py-24 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-[0.8] space-y-8 text-center lg:text-left z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan/10 text-xs font-black uppercase tracking-[0.2em] text-cyan">
              Crafting Digital Experiences
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-950 leading-[1.05] tracking-tighter">
              Full-Stack <span className="text-cyan">Developer</span> & <br />UI/UX Specialist
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
              Tôi xây dựng các ứng dụng web có khả năng mở rộng và trải nghiệm người dùng đột phá với những công nghệ tiên tiến nhất.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button className="px-10 py-4 bg-cyan text-white font-black rounded-2xl hover:shadow-2xl shadow-cyan/30 transition-all active:scale-95 uppercase tracking-widest text-xs flex items-center gap-2">
                View Projects <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 border-2 border-gray-950 text-gray-950 font-black rounded-2xl hover:bg-gray-950 hover:text-white transition-all uppercase tracking-widest text-xs">
                Download CV
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full"></div>
            <div className="relative w-full max-w-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000"
                alt="3D Rubik"
                className="w-full h-full object-contain animate-float transform scale-110 drop-shadow-[0_25px_60px_rgba(0,229,255,0.35)]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - Khôi phục nội dung thiếu */}
      <section id="about" className="px-6 md:px-20 lg:px-[120px] py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-cyan/10 rounded-[3rem] -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" 
              className="relative rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 aspect-square object-cover"
              alt="About Me"
            />
          </div>
          <div className="space-y-8">
            <span className="text-cyan font-black uppercase tracking-[0.3em] text-xs">About Me</span>
            <h2 className="text-4xl font-black text-gray-950 tracking-tighter leading-tight">Biến ý tưởng thành sản phẩm thực tế thông qua mã nguồn.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tôi là một lập trình viên Full-stack đam mê công nghệ 3D và tối ưu hóa trải nghiệm người dùng. Với nền tảng kiến thức vững chắc về hệ sinh thái React, tôi luôn tìm cách tạo ra những sản phẩm không chỉ chạy tốt mà còn phải đẹp.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-3xl font-black text-gray-950">15+</h4>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Dự án thành công</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-gray-950">02+</h4>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SKILLS SECTION - Khôi phục nội dung thiếu */}
      <section id="skills" className="px-6 md:px-20 lg:px-[120px] py-24 border-t border-gray-100">
        <div className="text-center mb-20 space-y-4">
          <span className="text-cyan font-black uppercase tracking-[0.3em] text-xs">My Expertise</span>
          <h2 className="text-4xl font-black text-gray-950 tracking-tighter">Kỹ năng chuyên môn</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <SkillCard icon={<Code2 size={32} />} title="Frontend" />
          <SkillCard icon={<Server size={32} />} title="Backend" />
          <SkillCard icon={<Database size={32} />} title="Database" />
          <SkillCard icon={<Layout size={32} />} title="UI/UX Design" />
          <SkillCard icon={<Smartphone size={32} />} title="Mobile App" />
          <SkillCard icon={<Terminal size={32} />} title="DevOps" />
        </div>
      </section>

      {/* 5. PROJECTS SECTION - Khôi phục nội dung thiếu */}
      <section id="projects" className="px-6 md:px-20 lg:px-[120px] py-24 bg-gray-950 rounded-[40px] md:rounded-[80px] mx-4 md:mx-10 my-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-cyan font-black uppercase tracking-[0.3em] text-xs">Portfolio</span>
          <h2 className="text-4xl font-black text-white tracking-tighter">Sản phẩm tiêu biểu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-white">
          <ProjectCard category="Web Application" title="Xeon Dashboard" image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" />
          <ProjectCard category="3D Design" title="Rubik Interactive" image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800" />
          <ProjectCard category="E-commerce" title="Tech Store" image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" />
        </div>
      </section>

      {/* 6. CONTACT SECTION - Khôi phục nội dung thiếu */}
      <section id="contact" className="px-6 md:px-20 lg:px-[120px] py-24">
        <div className="bg-cyan rounded-[40px] p-12 md:p-20 text-center space-y-8 shadow-2xl shadow-cyan/20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Bắt đầu dự án ngay?</h2>
          <p className="text-white/80 font-bold text-lg max-w-xl mx-auto">Liên hệ với tôi để cùng nhau tạo ra những sản phẩm kỹ thuật số tuyệt vời nhất.</p>
          <button className="px-12 py-5 bg-white text-cyan font-black rounded-2xl hover:scale-105 transition-all text-lg shadow-xl uppercase tracking-widest">
            Send Message
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="px-6 md:px-20 lg:px-[120px] py-16 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-gray-400 font-bold text-sm">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-cyan" />
            <span className="text-gray-950 tracking-tighter">Xeon.tech</span>
          </div>
          <p>© 2024 Design by Xeon. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-cyan transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-cyan transition-colors"><Facebook size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function SkillCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-cyan hover:shadow-xl transition-all group">
      <div className="text-gray-900 group-hover:text-cyan transition-colors">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">{title}</span>
    </div>
  );
}

function ProjectCard({ category, title, image }: { category: string; title: string; image: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
        <div className="absolute inset-0 bg-cyan/20 opacity-0 group-hover:opacity-100 transition-all"></div>
      </div>
      <span className="text-[10px] font-black text-cyan uppercase tracking-widest">{category}</span>
      <h3 className="text-2xl font-bold mt-2 group-hover:text-cyan transition-colors tracking-tight">{title}</h3>
    </div>
  );
}