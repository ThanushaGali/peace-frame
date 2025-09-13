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
    totalScreenings: 344,
    totalBookings: 176,
    avgWaitTime: "2.3 days",
    forumPosts: 758,
    riskPosts: 23,
    crisisInterventions: 7
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.totalScreenings}</div>
            <p className="text-xs text-muted-foreground">Total Screenings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-healing rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-calm rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.avgWaitTime}</div>
            <p className="text-xs text-muted-foreground">Avg Wait Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.forumPosts}</div>
            <p className="text-xs text-muted-foreground">Forum Posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.riskPosts}</div>
            <p className="text-xs text-muted-foreground">Risk Posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-secondary-dark">{kpiData.crisisInterventions}</div>
            <p className="text-xs text-muted-foreground">Crisis Cases</p>
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
                {kpiData.riskPosts} posts contain concerning language and require immediate review by moderators.
              </p>
              <Button size="sm" variant="destructive" className="mt-3">
                Review High-Risk Posts
              </Button>
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