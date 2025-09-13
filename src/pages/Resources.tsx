import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Download, 
  Search,
  Filter,
  Globe,
  Clock,
  Heart,
  Brain,
  Shield
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'pdf' | 'article';
  category: string;
  duration?: string;
  language: string;
  url: string;
  thumbnail?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock resources data
  const resources: Resource[] = [
    {
      id: "1",
      title: "Managing Academic Stress",
      description: "Learn practical techniques to handle academic pressure and maintain a healthy study-life balance.",
      type: "video",
      category: "Academic Stress",
      duration: "15 min",
      language: "English",
      url: "#",
      tags: ["stress", "study", "balance"],
      difficulty: "beginner"
    },
    {
      id: "2",
      title: "Mindfulness for Anxiety",
      description: "Guided meditation exercises specifically designed to reduce anxiety and promote calmness.",
      type: "audio",
      category: "Anxiety",
      duration: "20 min",
      language: "English",
      url: "#",
      tags: ["anxiety", "meditation", "mindfulness"],
      difficulty: "beginner"
    },
    {
      id: "3",
      title: "Understanding Depression",
      description: "Comprehensive guide about depression symptoms, causes, and treatment options available to students.",
      type: "pdf",
      category: "Depression",
      language: "English",
      url: "#",
      tags: ["depression", "mental health", "awareness"],
      difficulty: "intermediate"
    },
    {
      id: "4",
      title: "Building Healthy Relationships",
      description: "Tips and strategies for maintaining healthy relationships with friends, family, and romantic partners.",
      type: "article",
      category: "Relationships",
      duration: "8 min read",
      language: "English",
      url: "#",
      tags: ["relationships", "communication", "boundaries"],
      difficulty: "beginner"
    },
    {
      id: "5",
      title: "Sleep Hygiene for Students",
      description: "Evidence-based strategies to improve sleep quality and establish healthy sleep patterns.",
      type: "video",
      category: "Sleep",
      duration: "12 min",
      language: "English",
      url: "#",
      tags: ["sleep", "health", "routine"],
      difficulty: "beginner"
    },
    {
      id: "6",
      title: "Coping with Homesickness",
      description: "Practical advice for international and out-of-state students dealing with homesickness.",
      type: "article",
      category: "Adjustment",
      duration: "6 min read",
      language: "English",
      url: "#",
      tags: ["homesickness", "adjustment", "international"],
      difficulty: "beginner"
    },
    {
      id: "7",
      title: "Progressive Muscle Relaxation",
      description: "Step-by-step audio guide for progressive muscle relaxation technique to reduce physical tension.",
      type: "audio",
      category: "Relaxation",
      duration: "25 min",
      language: "English",
      url: "#",
      tags: ["relaxation", "tension", "body"],
      difficulty: "beginner"
    },
    {
      id: "8",
      title: "Crisis Management Handbook",
      description: "Comprehensive guide on recognizing mental health crises and knowing when and how to seek help.",
      type: "pdf",
      category: "Crisis Support",
      language: "English",
      url: "#",
      tags: ["crisis", "emergency", "support"],
      difficulty: "advanced"
    }
  ];

  const categories = Array.from(new Set(resources.map(r => r.category)));
  const languages = Array.from(new Set(resources.map(r => r.language)));

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage;
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesLanguage && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'pdf': return Download;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-gradient-primary';
      case 'audio': return 'bg-gradient-healing';
      case 'pdf': return 'bg-gradient-calm';
      case 'article': return 'bg-gradient-warm';
      default: return 'bg-gradient-primary';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-healing-green';
      case 'intermediate': return 'text-warm-amber';
      case 'advanced': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-dark mb-4">Resource Hub</h1>
        <p className="text-muted-foreground max-w-3xl">
          Access a comprehensive collection of evidence-based mental health resources including videos, 
          guided meditations, educational materials, and self-help tools designed specifically for college students.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">
              {resources.filter(r => r.type === 'video').length}
            </div>
            <p className="text-sm text-muted-foreground">Videos</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-gradient-healing rounded-lg flex items-center justify-center mx-auto mb-2">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">
              {resources.filter(r => r.type === 'audio').length}
            </div>
            <p className="text-sm text-muted-foreground">Audio</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-gradient-calm rounded-lg flex items-center justify-center mx-auto mb-2">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">
              {resources.filter(r => r.type === 'pdf').length}
            </div>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="w-12 h-12 bg-gradient-warm rounded-lg flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">
              {resources.filter(r => r.type === 'article').length}
            </div>
            <p className="text-sm text-muted-foreground">Articles</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map(language => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const ResourceIcon = getResourceIcon(resource.type);
          return (
            <Card 
              key={resource.id} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 ${getTypeColor(resource.type)} rounded-lg flex items-center justify-center`}>
                    <ResourceIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Globe className="w-3 h-3 mr-1" />
                      {resource.language}
                    </Badge>
                    {resource.duration && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.duration}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {resource.title}
                </CardTitle>
                
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="secondary">{resource.category}</Badge>
                  <span className={`capitalize font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button className="w-full group-hover:bg-primary/90" size="sm">
                  {resource.type === 'pdf' ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Resource
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-dark mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedLanguage("all");
              setSelectedCategory("all");
            }}
            variant="outline"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Crisis Support Card */}
      <Card className="mt-12 bg-gradient-warm border-0">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-dark mb-4">Need Immediate Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you're experiencing a mental health crisis or having thoughts of self-harm, 
            please reach out for immediate support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="destructive">
              Crisis Hotline: 988
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-dark text-secondary-dark">
              Emergency Services: 911
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;