import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MessageCircle, 
  Flag, 
  ThumbsUp, 
  Reply, 
  Plus,
  Clock,
  Users,
  AlertTriangle,
  Shield,
  Heart,
  TrendingUp
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  category: string;
  language: string;
  replies: number;
  likes: number;
  flagged: boolean;
  isRisky: boolean;
  tags: string[];
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  postCount: number;
  color: string;
}

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    anonymous: true
  });

  // Forum categories
  const categories: ForumCategory[] = [
    {
      id: "academic-stress",
      name: "Academic Stress",
      description: "Discussions about study pressure, exams, and academic challenges",
      icon: MessageCircle,
      postCount: 156,
      color: "primary"
    },
    {
      id: "anxiety",
      name: "Anxiety & Worry",
      description: "Support for anxiety, panic attacks, and worry management",
      icon: Heart,
      postCount: 203,
      color: "healing-green"
    },
    {
      id: "depression",
      name: "Depression & Mood",
      description: "Sharing experiences with depression and mood disorders",
      icon: Users,
      postCount: 178,
      color: "calming-purple"
    },
    {
      id: "relationships",
      name: "Relationships",
      description: "Family, friends, romantic relationships, and social connections",
      icon: Heart,
      postCount: 134,
      color: "warm-amber"
    },
    {
      id: "sleep",
      name: "Sleep & Rest",
      description: "Sleep problems, insomnia, and rest issues",
      icon: Clock,
      postCount: 87,
      color: "primary"
    },
    {
      id: "homesickness",
      name: "Homesickness",
      description: "Missing home, adjusting to new places, and cultural adaptation",
      icon: Users,
      postCount: 92,
      color: "healing-green"
    }
  ];

  // Mock forum posts
  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Struggling with final exams anxiety",
      content: "I've been feeling really overwhelmed with my upcoming finals. The pressure feels unbearable and I'm having trouble sleeping. Has anyone found effective ways to manage exam stress?",
      author: "Anon123",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: "academic-stress",
      language: "English",
      replies: 14,
      likes: 23,
      flagged: false,
      isRisky: false,
      tags: ["finals", "anxiety", "sleep"]
    },
    {
      id: "2",
      title: "Missing home so much it hurts",
      content: "I'm a first-year international student and I miss my family so much. Everything feels different here and I don't know how to cope with this loneliness.",
      author: "Anon456",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      category: "homesickness",
      language: "English",
      replies: 8,
      likes: 31,
      flagged: false,
      isRisky: false,
      tags: ["homesickness", "international", "lonely"]
    },
    {
      id: "3",
      title: "Panic attacks during presentations",
      content: "Every time I have to present in class, I get severe panic attacks. My heart races and I can't breathe properly. Looking for advice on how to manage this.",
      author: "Anon789",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      category: "anxiety",
      language: "English",
      replies: 19,
      likes: 45,
      flagged: false,
      isRisky: false,
      tags: ["panic", "presentations", "social-anxiety"]
    },
    {
      id: "4",
      title: "Feeling like nothing matters anymore",
      content: "I've been having really dark thoughts lately and feel like nothing I do matters. Everything seems pointless and I don't see the point in continuing.",
      author: "Anon321",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
      category: "depression",
      language: "English",
      replies: 27,
      likes: 12,
      flagged: true,
      isRisky: true,
      tags: ["depression", "hopeless", "dark-thoughts"]
    },
    {
      id: "5",
      title: "Can't fall asleep before 3 AM",
      content: "My sleep schedule is completely messed up. I can't fall asleep before 3 AM and then I'm exhausted for my morning classes. Any tips for fixing sleep patterns?",
      author: "Anon654",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      category: "sleep",
      language: "English",
      replies: 11,
      likes: 18,
      flagged: false,
      isRisky: false,
      tags: ["insomnia", "sleep-schedule", "tired"]
    }
  ];

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const filteredPosts = forumPosts
    .filter(post => selectedCategory === "all" || post.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.timestamp.getTime() - a.timestamp.getTime();
        case "oldest":
          return a.timestamp.getTime() - b.timestamp.getTime();
        case "most-replies":
          return b.replies - a.replies;
        case "most-liked":
          return b.likes - a.likes;
        case "flagged":
          return Number(b.flagged) - Number(a.flagged);
        default:
          return 0;
      }
    });

  const handleNewPost = () => {
    if (!newPost.title || !newPost.content || !newPost.category) return;
    
    // In a real app, this would submit to the backend
    console.log("New post:", newPost);
    setShowNewPostForm(false);
    setNewPost({ title: "", content: "", category: "", anonymous: true });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-dark mb-4">Peer Support Forum</h1>
        <p className="text-muted-foreground max-w-3xl">
          Connect with fellow students in a safe, anonymous space. Share experiences, offer support, 
          and find community with others who understand what you're going through.
        </p>
      </div>

      {/* Community Guidelines Banner */}
      <Alert className="mb-8 bg-primary-light border-primary">
        <Shield className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary">
          <strong>Community Guidelines:</strong> Be respectful, maintain anonymity, offer support not advice, 
          and report any content that concerns you. Posts are monitored for safety.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          {/* New Post Button */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <Button
                onClick={() => setShowNewPostForm(true)}
                className="w-full bg-gradient-primary hover:opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedCategory === "all" 
                    ? "bg-primary/10 text-primary border border-primary" 
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">All Topics</span>
                  <Badge variant="outline">{forumPosts.length}</Badge>
                </div>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id 
                      ? "bg-primary/10 text-primary border border-primary" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline">{category.postCount}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Newest First
                  </div>
                </SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-replies">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Most Replies
                  </div>
                </SelectItem>
                <SelectItem value="most-liked">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Most Liked
                  </div>
                </SelectItem>
                <SelectItem value="flagged">
                  <div className="flex items-center">
                    <Flag className="w-4 h-4 mr-2" />
                    Flagged Posts
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {filteredPosts.length} posts
            </div>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <Card className="mb-6 border-primary shadow-medium">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What would you like to discuss?"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={newPost.category} onValueChange={(value) => 
                    setNewPost(prev => ({ ...prev, category: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your thoughts, experiences, or questions..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.anonymous}
                    onChange={(e) => setNewPost(prev => ({ ...prev, anonymous: e.target.checked }))}
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    Post anonymously (recommended)
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={handleNewPost} className="bg-gradient-primary hover:opacity-90 text-white">
                    Post
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className={`hover:shadow-medium transition-shadow ${
                  post.isRisky ? 'border-destructive bg-destructive/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {categories.find(c => c.id === post.category)?.name}
                        </Badge>
                        {post.isRisky && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Needs Attention
                          </Badge>
                        )}
                        {post.flagged && (
                          <Badge variant="secondary" className="text-xs">
                            <Flag className="w-3 h-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-dark mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{getTimeAgo(post.timestamp)}</span>
                        <span>•</span>
                        <span>{post.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Reply className="w-4 h-4 mr-1" />
                        Reply ({post.replies})
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-dark mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to start a conversation in this category.
              </p>
              <Button 
                onClick={() => setShowNewPostForm(true)}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;