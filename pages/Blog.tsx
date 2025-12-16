import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export const Blog: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Reduced pt-32 to pt-12 */}
      <div className="pt-12 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Wissen & Insights</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Blog & News</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Aktuelle Entwicklungen im Glasfasermarkt, Tipps für deine Vertriebskarriere und Einblicke hinter die Kulissen von MQ-Connect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group h-full">
              <Card className="flex flex-col h-full border-slate-200 hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden bg-white">
                {/* Image Section */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#004e82] uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readingTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-[#004e82] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-[#004e82] font-bold text-sm mt-auto group/btn">
                    Artikel lesen <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};