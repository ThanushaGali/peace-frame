import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  Download,
  Eye,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("30days");

  // Mock analytics data
  const screeningData = [
    { severity: "Minimal", count: 145, percentage: 42, color: "#10B981" },
    { severity: "Mild", count: 89, percentage: 26, color: "#F59E0B" },
    { severity: "Moderate", count: 76, percentage: 22, color: "#EF4444" },
    { severity: "Severe", count: 34, percentage: 10, color: "#DC2626" }
  ];

  const screeningTrend = [
    { date: "Jan 1", screenings: 12, depression: 8, anxiety: 4 },
    { date: "Jan 7", screenings: 18, depression: 11, anxiety: 7 },
    { date: "Jan 14", screenings: 25, depression: 16, anxiety: 9 },
    { date: "Jan 21", screenings: 31, depression: 19, anxiety: 12 },
    { date: "Jan 28", screenings: 28, depression: 17, anxiety: 11 },
    { date: "Feb 4", screenings: 35, depression: 22, anxiety: 13 },
    { date: "Feb 11", screenings: 42, depression: 26, anxiety: 16 }
  ];

  const bookingData = [
    { counselor: "Dr. Johnson", bookings: 45, utilization: 85 },
    { counselor: "Dr. Chen", bookings: 38, utilization: 72 },
    { counselor: "Dr. Rodriguez", bookings: 52, utilization: 98 },
    { counselor: "Dr. Wilson", bookings: 41, utilization: 78 }
  ];

  const forumStats = [
    { topic: "Academic Stress", posts: 156, risk: "Low" },
    { topic: "Anxiety", posts: 203, risk: "Medium" },
    { topic: "Depression", posts: 178, risk: "High" },
    { topic: "Relationships", posts: 134, risk: "Low" },
    { topic: "Sleep Issues", posts: 87, risk: "Low" }
  ];

  const kpiData = {
    totalScreeningsToday: 23,
    totalScreeningsMonth: 344,
    totalScreeningsOverall: 2847,
    severityMild: 145,
    severityModerate: 89,
    severitySevere: 34,
    bookingsToday: 12,
    bookingsConfirmed: 8,
    bookingsPending: 4,
    forumDiscussions24h: 47,
    resourceDownloads: 389,
    resourceViews: 1247,
    flaggedPosts: 23,
    emergencyAlerts: 7,
    anonymousBookings: 15
  };

  const exportData = (type: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} data...`);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-dark mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Mental health analytics and system overview for MindSupport platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportData('all')}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Crisis Alert */}
      <Alert className="mb-8 border-destructive bg-destructive/5">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-destructive">
          <div className="flex items-center justify-between">
            <span><strong>7 crisis interventions</strong> in the last 30 days. 23 high-risk forum posts require review.</span>
            <Button size="sm" variant="destructive">
              Review Cases
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {/* Total Screenings */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary-dark">{kpiData.totalScreeningsToday}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              This Month: {kpiData.totalScreeningsMonth} • Total: {kpiData.totalScreeningsOverall}
            </div>
          </CardContent>
        </Card>

        {/* Severity Breakdown */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Severity Levels</div>
              <TrendingUp className="w-6 h-6 text-healing-green" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-healing-green">Mild</span>
                <span>{kpiData.severityMild}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-amber">Moderate</span>
                <span>{kpiData.severityModerate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-destructive">Severe</span>
                <span>{kpiData.severitySevere}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counsellor Bookings Today */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary-dark">{kpiData.bookingsToday}</div>
                <p className="text-xs text-muted-foreground">Bookings Today</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-2 text-xs">
              <span className="text-healing-green">✓ {kpiData.bookingsConfirmed} Confirmed</span>
              <span className="text-warm-amber ml-2">⏳ {kpiData.bookingsPending} Pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Forum Discussions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary-dark">{kpiData.forumDiscussions24h}</div>
                <p className="text-xs text-muted-foreground">Active Discussions</p>
              </div>
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Last 24 hours</div>
          </CardContent>
        </Card>

        {/* Resource Downloads/Views */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Resources</div>
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Download className="w-3 h-3" />Downloads
                </span>
                <span>{kpiData.resourceDownloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />Views
                </span>
                <span>{kpiData.resourceViews}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Monitoring */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-destructive">Emergency</div>
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>🚨 Alerts</span>
                <span className="text-destructive font-bold">{kpiData.emergencyAlerts}</span>
              </div>
              <div className="flex justify-between">
                <span>🔎 Flagged Posts</span>
                <span className="text-warm-amber">{kpiData.flaggedPosts}</span>
              </div>
              <div className="flex justify-between">
                <span>📌 Anonymous</span>
                <span>{kpiData.anonymousBookings}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Screening Results Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Screening Severity Distribution
              <Button variant="ghost" size="sm" onClick={() => exportData('screening')}>
                <Download className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={screeningData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    label={(entry) => `${entry.severity}: ${entry.percentage}%`}
                  >
                    {screeningData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {screeningData.map(item => (
                <div key={item.severity} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.severity}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Screening Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Screening Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={screeningTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="screenings" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Total"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depression" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Depression"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anxiety" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="Anxiety"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Counselor Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Counselor Utilization
              <Button variant="ghost" size="sm" onClick={() => exportData('counselors')}>
                <Download className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="counselor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {bookingData.map(counselor => (
                <div key={counselor.counselor} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{counselor.counselor}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{counselor.utilization}%</span>
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${counselor.utilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forum Activity & Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Forum Activity & Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forumStats.map(topic => (
                <div key={topic.topic} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{topic.topic}</div>
                    <div className="text-sm text-muted-foreground">{topic.posts} posts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        topic.risk === 'High' ? 'destructive' : 
                        topic.risk === 'Medium' ? 'secondary' : 'outline'
                      }
                    >
                      {topic.risk} Risk
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="font-medium text-destructive">High Priority</span>
              </div>
              <p className="text-sm text-destructive/80">
                {kpiData.flaggedPosts} posts contain concerning language and require immediate review by moderators.
              </p>
              <Button size="sm" variant="destructive" className="mt-3">
                Review High-Risk Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Support Monitoring */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Flagged Forum Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Alert className="border-destructive bg-destructive/5">
                <AlertDescription className="text-destructive">
                  <div className="flex items-center justify-between">
                    <span><strong>High Priority:</strong> 5 posts contain keywords: "hopeless", "suicidal thoughts"</span>
                    <Button size="sm" variant="destructive">Review</Button>
                  </div>
                </AlertDescription>
              </Alert>
              
              <Alert className="border-warm-amber bg-warm-amber/5">
                <AlertDescription className="text-warm-amber">
                  <div className="flex items-center justify-between">
                    <span><strong>Medium Priority:</strong> 12 posts mention "can't cope", "overwhelmed"</span>
                    <Button size="sm" variant="outline">Monitor</Button>
                  </div>
                </AlertDescription>
              </Alert>
              
              <Alert className="border-primary bg-primary/5">
                <AlertDescription className="text-primary">
                  <div className="flex items-center justify-between">
                    <span><strong>Low Priority:</strong> 6 posts about "exam stress", "deadline pressure"</span>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Users className="w-5 h-5" />
              Emergency Alerts & Anonymous Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-destructive">🚨 Emergency Alerts Today</span>
                  <Badge variant="destructive">{kpiData.emergencyAlerts}</Badge>
                </div>
                <p className="text-sm text-destructive/80 mb-3">
                  Students triggered "Immediate Help" during AI chat sessions
                </p>
                <Button size="sm" variant="destructive" className="w-full">
                  View Emergency Cases
                </Button>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary">📌 Anonymous Bookings</span>
                  <Badge variant="outline">{kpiData.anonymousBookings}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Tokens awaiting counsellor assignment
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Assign Counsellors
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Health & Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-healing-green mb-2">99.8%</div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">1,247</div>
              <p className="text-sm text-muted-foreground">Active Users (30d)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-amber mb-2">4.7s</div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;