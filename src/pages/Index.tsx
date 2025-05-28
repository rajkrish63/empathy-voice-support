
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, TrendingUp, Shield, Brain, Users } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import ChatInterface from "@/components/ChatInterface";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<"chat" | "dashboard">("chat");

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">MindCare AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={activeView === "chat" ? "default" : "ghost"}
                onClick={() => setActiveView("chat")}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </Button>
              <Button
                variant={activeView === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveView("dashboard")}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
        
        <main className="max-w-6xl mx-auto p-4">
          {activeView === "chat" ? <ChatInterface /> : <Dashboard />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Heart className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MindCare AI</h1>
                <p className="text-sm text-gray-600">Your Mental Health Companion</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your AI-Powered
            <span className="text-blue-600 block">Mental Health Companion</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized, real-time mental health support through empathetic AI conversations, 
            emotional tracking, and crisis intervention - available 24/7 whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white/60 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">AI Chat Support</h3>
            </div>
            <p className="text-gray-600">
              Engage in meaningful conversations with our empathetic AI that understands your emotions and provides personalized support.
            </p>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Emotional Tracking</h3>
            </div>
            <p className="text-gray-600">
              Monitor your emotional patterns and mental health trends with intelligent analytics and personalized insights.
            </p>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Crisis Detection</h3>
            </div>
            <p className="text-gray-600">
              Advanced AI monitoring for crisis situations with immediate intervention and support resources.
            </p>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white/60 backdrop-blur-sm border-blue-100">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-10 h-10 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Advanced NLP Understanding</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Our AI uses cutting-edge natural language processing to understand context, sentiment, and emotional intensity in your conversations.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Sentiment analysis and emotion detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Context-aware responses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Crisis keyword monitoring</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-white/60 backdrop-blur-sm border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-10 h-10 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Privacy & Security</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your mental health data is protected with enterprise-grade security and privacy-preserving technologies.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>End-to-end encrypted conversations</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Secure user authentication</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>HIPAA-compliant data handling</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Mental Health Journey?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust MindCare AI for their mental wellness needs.
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowAuth(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onSuccess={() => {
            setIsLoggedIn(true);
            setShowAuth(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
