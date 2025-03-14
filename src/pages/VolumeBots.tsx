
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { usePageTransition } from '@/utils/animations';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Activity, Play, Pause } from "lucide-react";

const VolumeBots = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { isVisible, animationProps, staggeredAnimationProps } = usePageTransition();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
  }, [navigate]);
  
  const handleToggleBot = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Bot Stopped" : "Bot Started",
      description: `Volume Bot has been ${isActive ? "deactivated" : "activated"}.`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8" {...animationProps}>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <Activity className="mr-3 h-7 w-7 text-solana" />
                Volume Bot
              </h1>
              <p className="text-muted-foreground">
                Trade based on volume indicators and market movements
              </p>
            </div>
            
            <Button 
              className={`${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-solana to-accent'} hover:shadow-lg transition-all duration-300`}
              onClick={handleToggleBot}
            >
              {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isActive ? 'Stop Bot' : 'Start Bot'}
            </Button>
          </div>
          
          <div {...animationProps}>
            <Card className="border backdrop-blur-sm bg-black/30 glass-dark min-h-[400px]">
              <CardContent className="p-6">
                {/* Empty frame for future content */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolumeBots;
