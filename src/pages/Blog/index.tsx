import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/ui/Header';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/ui/Button';
import { useBlogs } from '@/hooks/useFirebase';
import { Blog } from '@/types';
import Footer from '@/pages/Home/components/Footer';

const BlogPage: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ta'>('en');
  const [selectedCategory] = useState<string>('all');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { data: blogs, loading, error } = useBlogs();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'ta' || 'en';
    setCurrentLanguage(savedLanguage);
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "Thought Leadership",
      subtitle: "Explore Dr. Jawahirullah's insights on politics, governance, and contemporary issues",
      categories: "Categories",
      allPosts: "All Posts",
      politics: "Politics",
      governance: "Governance",
      development: "Development",
      society: "Society",
      readMore: "Read More",
      readFull: "Read Full Article",
      publishedOn: "Published on",
      readTime: "min read",
      views: "Views",
      comments: "Comments",
      noPosts: "No blog posts found in this category.",
      loading: "Loading blog posts...",
      closeArticle: "Close Article",
      backToBlog: "Back to Blog"
    },
    ta: {
      title: "சிந்தனைத் தலைமை",
      subtitle: "அரசியல், ஆட்சி மற்றும் சமகால பிரச்சினைகள் குறித்த டாக்டர் ஜவாஹிருல்லாஹ்வின் நுண்ணறிவுகளை ஆராயுங்கள்",
      categories: "வகைகள்",
      allPosts: "அனைத்து இடுகைகள்",
      politics: "அரசியல்",
      governance: "ஆட்சி",
      development: "வளர்ச்சி",
      society: "சமூகம்",
      readMore: "மேலும் படிக்க",
      readFull: "முழு கட்டுரையைப் படிக்கவும்",
      publishedOn: "வெளியிடப்பட்ட தேதி",
      readTime: "நிமிட வாசிப்பு",
      views: "பார்வைகள்",
      comments: "கருத்துகள்",
      noPosts: "இந்த வகையில் வலைப்பதிவு இடுகைகள் எதுவும் கிடைக்கவில்லை.",
      loading: "வலைப்பதிவு இடுகைகள் ஏற்றப்படுகின்றன...",
      closeArticle: "கட்டுரையை மூடு",
      backToBlog: "வலைப்பதிவுக்குத் திரும்பு"
    }
  };

  const currentContent = content[currentLanguage];

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs.filter(blog => blog.status === 'published')
    : blogs.filter(blog => blog.status === 'published' && blog.category.toLowerCase().includes(selectedCategory));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLanguage === 'en' 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatViews = (views: number) => {
    if (!views || views === undefined) return '0';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="font-body text-text-secondary">{currentContent.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {currentLanguage === 'en' 
            ? 'Blog by Dr. MH Jawahirullah | Thought Leadership' 
            : 'டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் வலைப்பதிவு | சிந்தனைத் தலைமை'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'en' 
            ? 'Read Dr. MH Jawahirullah\'s insights on politics, governance, and contemporary issues. Explore thought-provoking articles on Tamil Nadu\'s development.'
            : 'அரசியல், ஆட்சி மற்றும் சமகால பிரச்சினைகள் குறித்த டாக்டர் எம்.எச். ஜவாஹிருல்லாஹ்வின் நுண்ணறிவுகளைப் படியுங்கள்.'
          }
        />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-headline font-bold text-4xl lg:text-5xl text-primary mb-6">
                {currentContent.title}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {currentContent.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="text-center py-12">
                <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
                <p className="font-body text-red-600">{error}</p>
              </div>
            )}

            {filteredBlogs.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <Icon name="PenTool" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="font-body text-text-secondary">{currentContent.noPosts}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.filter(blog => blog.status === 'published').map((blog) => (
                <article key={blog.id} className="bg-card rounded-xl shadow-elevated overflow-hidden hover-lift transition-smooth">
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={blog.featuredImageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
                      alt={currentLanguage === 'en' ? blog.title : blog.titleTamil}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="font-headline text-xl font-semibold text-primary mb-3 line-clamp-2">
                      {currentLanguage === 'en' ? blog.title : blog.titleTamil}
                    </h2>
                    
                    <p className="font-body text-text-secondary mb-4 line-clamp-3 leading-relaxed">
                      {currentLanguage === 'en' ? blog.excerpt : blog.excerptTamil}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {formatDate(blog.publishDate)}
                        </div>
                        <div className="flex items-center">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {blog.readingTime} {currentContent.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center">
                          <Icon name="Eye" size={14} className="mr-1" />
                          {blog.views || 0}
                        </div>
                        <div className="flex items-center">
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          {blog.comments || 0}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        iconName="ArrowRight" 
                        iconPosition="right"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        {currentContent.readMore}
                      </Button>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Blog Article Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-body font-medium">
                      {currentLanguage === 'en' ? selectedBlog.category : selectedBlog.categoryTamil}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {formatDate(selectedBlog.publishDate)}
                    </span>
                  </div>
                  <h1 className="font-headline text-3xl font-bold text-primary mb-4">
                    {currentLanguage === 'en' ? selectedBlog.title : selectedBlog.titleTamil}
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {selectedBlog.readingTime} {currentContent.readTime}
                    </div>
                    <div className="flex items-center">
                      <Icon name="Eye" size={14} className="mr-1" />
                      {formatViews(selectedBlog.views)} {currentContent.views}
                    </div>
                    <div className="flex items-center">
                      <Icon name="MessageCircle" size={14} className="mr-1" />
                      {selectedBlog.comments} {currentContent.comments}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-smooth flex-shrink-0"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              {selectedBlog.featuredImageUrl && (
                <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.featuredImageUrl}
                    alt={currentLanguage === 'en' ? selectedBlog.title : selectedBlog.titleTamil}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                <div 
                  className="font-body text-text-primary leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: currentLanguage === 'en' ? selectedBlog.content : selectedBlog.contentTamil 
                  }}
                />
              </div>
              
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-headline font-semibold text-lg text-primary mb-3">
                    {currentLanguage === 'en' ? 'Tags' : 'குறிச்சொற்கள்'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-muted text-text-secondary text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => setSelectedBlog(null)}
                >
                  {currentContent.backToBlog}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;