"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingBag, User, Camera } from "lucide-react";

interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  products: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  timestamp: string;
}

export default function SocialGallery() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  // Mock social posts (in production, fetch from your API)
  const mockPosts: SocialPost[] = [
    {
      id: "1",
      username: "tech_style_influencer",
      avatar: "/avatars/user1.jpg",
      image: "/social/social1.webp",
      caption: "Rocking the Future Fit oversized tee - perfect for my tech-noir aesthetic! 🚀",
      likes: 234,
      products: [
        { id: "oversized-box-tee", name: "Oversized Box Tee", price: 1499 }
      ],
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      username: "streetwear_fanatic",
      avatar: "/avatars/user2.jpg",
      image: "/social/social2.webp",
      caption: "Complete the look with Future Fit hoodie and accessories ✨",
      likes: 189,
      products: [
        { id: "oversized-hoodie", name: "Oversized Hoodie", price: 2999 },
        { id: "premium-round-neck-tee", name: "Premium Round Neck Tee", price: 1299 }
      ],
      timestamp: "4 hours ago"
    },
    {
      id: "3",
      username: "minimalist_wear",
      avatar: "/avatars/user3.jpg",
      image: "/social/social3.webp",
      caption: "Less is more with Future Fit's clean aesthetic 🖤",
      likes: 156,
      products: [
        { id: "classic-round-neck-tee", name: "Classic Round Neck Tee", price: 999 }
      ],
      timestamp: "6 hours ago"
    }
  ];

  useEffect(() => {
    // Simulate initial load
    setPosts(mockPosts.slice(0, visiblePosts));
  }, []);

  // Intersection Observer for infinite scroll
  const lastPostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  const loadMorePosts = async () => {
    if (isLoading || posts.length >= mockPosts.length) return;

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPosts = mockPosts.slice(posts.length, posts.length + 3);
    setPosts(prev => [...prev, ...newPosts]);
    setIsLoading(false);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Community Style</h2>
          <p className="text-muted-foreground mb-6">
            See how others are styling Future Fit. Share your look with #FutureFitStyle
          </p>
          <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
            <Camera size={18} />
            Share Your Style
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={index === posts.length - 1 ? lastPostRef : null}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={index < 6 ? "eager" : "lazy"}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    {post.products.map(product => (
                      <button
                        key={product.id}
                        className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium hover:bg-background transition-colors"
                      >
                        ₹{product.price}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Info */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={post.avatar}
                    alt={post.username}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.username}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Heart size={12} />
                      {post.likes}
                    </button>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Loading more styles...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
