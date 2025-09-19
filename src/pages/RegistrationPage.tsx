

import { useState } from "react";
           

import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users, Star, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../components/ui/Footer";

import heroImage from "../assests/hero-education.jpg";



const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "Teachers Assisted" },
    { number: "50+", label: "Subject Covered" },
    { number: "4.9", label: "User Satisfaction" }
  ];

  const features = [
    {
      icon: Users,
      title: "Instant Doubt Solver",  
      description: "Get answers to any academic question instantly with AI-powered explanations"
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Curated courses designed for effective learning"  
    },
    {
      icon: Play,
      title: "Interactive Learning",
      description: "Engaging multimedia content and practical exercises"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero Section */}
      <section className="py-32  hero-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Best Learning Platform
                </p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Got a Doubt? Just Ask Sahayak.
                  
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Your AI buddy that explains tough concepts, makes worksheets, 
                  and even plans lessons — just like your smartest study partner.
                  
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="gradient-primary h-12 px-8 text-lg font-medium text-background hover:opacity-90"
                  onClick={() => navigate('/login/student')}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in [animation-delay:200ms]">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Professional education and online learning illustration"
                  className="w-full h-auto rounded-2xl shadow-[var(--shadow-hover)]"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center shadow-[var(--shadow-card)] animate-bounce [animation-delay:1s]">
                  <GraduationCap className="w-8 h-8 text-background" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 gradient-accent rounded-full flex items-center justify-center shadow-[var(--shadow-card)] animate-bounce [animation-delay:1.5s]">
                  <BookOpen className="w-8 h-8 text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-32 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8 mb-24">
            <h2 className="text-4xl md:text-5xl font-bold">Choose Your Learning Path</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of learners and educators in our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Student Card */}
            <div 
              className="clean-card clean-card-hover p-14 cursor-pointer group animate-slide-up min-h-[300px] flex flex-col"
              onClick={() => navigate('/login/student')}
            >
              {/* Logo Area - Top Section */}
              <div className="flex justify-center mb-12">
                <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xl">
                  <GraduationCap className="w-16 h-16 text-background" />
                </div>
              </div>
              
              {/* Content - Middle Section */}
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold">I'm a Student</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed px-6">
                    Start your learning journey with expert guidance and AI-powered assistance
                  </p>
                </div>
              </div>
              
              {/* Action - Bottom Section */}
              <div className="pt-8 mt-8">
                <div className="inline-flex items-center font-semibold text-primary group-hover:underline text-xl">
                  Start Learning <ArrowRight className="ml-4 w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Teacher Card */}
            <div 
              className="clean-card clean-card-hover p-16 cursor-pointer group animate-slide-up [animation-delay:200ms] min-h-[600px] flex flex-col"
              onClick={() => navigate('/login/teacher')}
            >
              {/* Logo Area - Top Section */}
              <div className="flex justify-center mb-12">
                <div className="w-32 h-32 gradient-accent rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xl">
                  <BookOpen className="w-16 h-16 text-foreground" />
                </div>
              </div>
              
              {/* Content - Middle Section */}
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold">I'm a Teacher</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed px-6">
                    Share your expertise and inspire the next generation of learners
                  </p>
                </div>
              </div>
              
              {/* Action - Bottom Section */}
              <div className="pt-8 mt-8">
                <div className="inline-flex items-center font-semibold text-primary group-hover:underline text-xl">
                  Start Teaching <ArrowRight className="ml-4 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            
              Helping Students Learn & Teachers Teach Smarter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI tools that simplify studying for learners and save time for educators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="clean-card p-8 text-center animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;




