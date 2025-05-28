
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Heart, AlertTriangle, Calendar, BarChart3, Activity } from "lucide-react";

const Dashboard = () => {
  // Mock data - in a real app, this would come from your backend
  const emotionalData = {
    todayMood: "Neutral",
    weeklyAverage: 65,
    conversationsToday: 3,
    conversationsWeek: 12,
    crisisAlertsWeek: 0,
    improvementTrend: "+12%"
  };

  const recentSessions = [
    { date: "Today, 2:30 PM", mood: "Positive", duration: "15 min", topics: ["work stress", "anxiety"] },
    { date: "Yesterday, 7:45 PM", mood: "Neutral", duration: "22 min", topics: ["relationships", "self-care"] },
    { date: "2 days ago, 10:15 AM", mood: "Negative", duration: "18 min", topics: ["depression", "motivation"] },
  ];

  const emotionalTrends = [
    { day: "Mon", score: 70 },
    { day: "Tue", score: 65 },
    { day: "Wed", score: 75 },
    { day: "Thu", score: 60 },
    { day: "Fri", score: 80 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 78 },
  ];

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "positive": return "text-green-600 bg-green-50";
      case "negative": return "text-red-600 bg-red-50";
      case "crisis": return "text-red-800 bg-red-100";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mental Health Dashboard</h2>
        <p className="text-gray-600">Track your emotional journey and mental wellness progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/60 backdrop-blur-sm border-blue-100">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Today's Mood</p>
              <p className="text-2xl font-bold text-gray-800">{emotionalData.todayMood}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm border-green-100">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Weekly Average</p>
              <p className="text-2xl font-bold text-gray-800">{emotionalData.weeklyAverage}%</p>
              <p className="text-sm text-green-600">{emotionalData.improvementTrend} from last week</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Sessions This Week</p>
              <p className="text-2xl font-bold text-gray-800">{emotionalData.conversationsWeek}</p>
              <p className="text-sm text-purple-600">{emotionalData.conversationsToday} today</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-sm border-orange-100">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Crisis Alerts</p>
              <p className="text-2xl font-bold text-gray-800">{emotionalData.crisisAlertsWeek}</p>
              <p className="text-sm text-orange-600">This week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Emotional Trends Chart */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm border-blue-100">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Weekly Emotional Trends</h3>
        </div>
        <div className="space-y-4">
          {emotionalTrends.map((day, index) => (
            <div key={day.day} className="flex items-center space-x-4">
              <span className="w-8 text-sm font-medium text-gray-600">{day.day}</span>
              <div className="flex-1">
                <Progress value={day.score} className="h-3" />
              </div>
              <span className="w-12 text-sm text-gray-600">{day.score}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Sessions */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm border-blue-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Recent Sessions</h3>
        </div>
        <div className="space-y-4">
          {recentSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-gray-800">{session.date}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(session.mood)}`}>
                    {session.mood}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Duration: {session.duration}</span>
                  <span>Topics: {session.topics.join(", ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Mental Health Tips */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Wellness Tips</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/70 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Based on Your Recent Sessions</h4>
            <p className="text-sm text-gray-600">
              You've been discussing work stress frequently. Consider practicing deep breathing exercises 
              during breaks to help manage anxiety levels.
            </p>
          </div>
          <div className="p-4 bg-white/70 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Mood Pattern Insight</h4>
            <p className="text-sm text-gray-600">
              Your mood tends to improve over weekends. Try incorporating some weekend activities 
              into your weekday routine for better emotional balance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
