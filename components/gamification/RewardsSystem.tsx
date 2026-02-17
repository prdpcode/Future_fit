"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, Zap, Gift, Lock, ShoppingBag } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface UserStats {
  points: number;
  level: number;
  nextLevelPoints: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export default function RewardsSystem() {
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    level: 1,
    nextLevelPoints: 100,
    achievementsUnlocked: 0,
    totalAchievements: 8
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_purchase",
      title: "First Step",
      description: "Complete your first purchase",
      icon: <ShoppingBag size={16} />,
      points: 50,
      unlocked: false
    },
    {
      id: "style_explorer",
      title: "Style Explorer",
      description: "Try on 5 different products",
      icon: <Star size={16} />,
      points: 30,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: "social_butterfly",
      title: "Social Butterfly",
      description: "Share your style 3 times",
      icon: <Gift size={16} />,
      points: 40,
      unlocked: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: "loyalty_master",
      title: "Loyalty Master",
      description: "Make 10 purchases",
      icon: <Trophy size={16} />,
      points: 100,
      unlocked: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: "trendsetter",
      title: "Trendsetter",
      description: "Buy a new collection item",
      icon: <Zap size={16} />,
      points: 60,
      unlocked: false
    },
    {
      id: "early_bird",
      title: "Early Bird",
      description: "Shop within 1 hour of new drop",
      icon: <Star size={16} />,
      points: 75,
      unlocked: false
    },
    {
      id: "collector",
      title: "Collector",
      description: "Own 5 different products",
      icon: <Trophy size={16} />,
      points: 80,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: "influencer",
      title: "Influencer",
      description: "Refer 5 friends who purchase",
      icon: <Gift size={16} />,
      points: 150,
      unlocked: false,
      progress: 1,
      maxProgress: 5
    }
  ]);

  // Calculate level based on points
  useEffect(() => {
    const calculateLevel = (points: number) => {
      return Math.floor(points / 100) + 1;
    };

    const level = calculateLevel(userStats.points);
    const nextLevelPoints = level * 100;
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    setUserStats(prev => ({
      ...prev,
      level,
      nextLevelPoints,
      achievementsUnlocked: unlockedCount
    }));
  }, [userStats.points, achievements]);

  const progressToNextLevel = (userStats.points % 100);

  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Future Fit Rewards</h2>
          <p className="text-muted-foreground">
            Earn points, unlock achievements, and get exclusive perks
          </p>
        </div>

        {/* User Stats */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Level {userStats.level}</p>
                <p className="text-2xl font-bold">{userStats.points} Points</p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy size={24} className="text-primary" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level {userStats.level}</span>
                <span>Level {userStats.level + 1}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {100 - progressToNextLevel} points to next level
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <p className="text-lg font-bold">{userStats.achievementsUnlocked}</p>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{userStats.level}</p>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-background border rounded-lg p-4 transition-all duration-300 ${
                achievement.unlocked
                  ? "border-primary/50 shadow-sm"
                  : "border-border opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.unlocked
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {achievement.unlocked ? achievement.icon : <Lock size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{achievement.title}</p>
                  <p className="text-xs text-primary font-semibold">+{achievement.points} pts</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
              
              {/* Progress Bar for incomplete achievements */}
              {achievement.progress !== undefined && achievement.maxProgress && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {achievement.unlocked && (
                <div className="text-xs text-primary font-medium mt-2">
                  ✓ Unlocked
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rewards Preview */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Unlock exclusive rewards: Early access, special discounts, and limited edition drops
          </p>
          <button className="bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            View All Rewards
          </button>
        </div>
      </div>
    </div>
  );
}
