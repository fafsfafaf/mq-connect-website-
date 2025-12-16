import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BLOG_POSTS } from '../data/blogPosts';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-4">
        <h1 className="text-3xl font-bold mb-4">Artikel nicht gefunden</h1>
        <Button onClick={() => navigate('/blog')}>Zurück zur Übersicht</Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header with Image Background */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* REFACTOR: Removed backdrop-blur-[2px], used solid semi-transparent slate */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 h-full flex flex-col justify-center pt-20">
          <Link to="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Zurück zum Blog
          </Link>
          
          <div className="mb-4 flex items-center gap-3">
             <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               {post.category}
             </span>
             <span className="text-slate-300 text-sm flex items-center gap-1">
               <Clock className="w-4 h-4" /> {post.readingTime}
             </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                 <User className="w-4 h-4 text-slate-200" />
               </div>
               {post.author}
             </div>
             <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4" />
               {post.date}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Card className="bg-white p-8 md:p-12 shadow-xl border-none mb-12">
              <div 
                className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-10 prose-headings:mb-6
                prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
                prose-a:text-[#004e82] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-li:text-slate-600 prose-li:leading-relaxed prose-li:my-2
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-[#004e82] prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-slate-800 prose-blockquote:rounded-r-lg prose-blockquote:my-8"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* CTA Card */}
            <div className="sticky top-28">
              <Card className="bg-[#004e82] text-white p-8 border-none shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl -ml-12 -mb-12"></div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10">Bereit für den nächsten Schritt?</h3>
                <p className="text-blue-100 mb-8 relative z-10">
                  Nutze das Wissen aus diesem Artikel und starte deine Karriere im Vertrieb bei MQ-Connect.
                </p>
                
                {/* Updated Button Container: Added Flex Col and Gap */}
                <div className="relative z-10 flex flex-col gap-4">
                  <Link to="/bewerben" className="block">
                    {/* Using variant="secondary" guarantees dark text on white background */}
                    <Button fullWidth variant="secondary" className="font-bold border-none text-slate-900">
                      Jetzt in 60 Sek. bewerben
                    </Button>
                  </Link>
                  <Link to="/kontakt" className="block">
                    <Button fullWidth variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                      Fragen stellen
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};