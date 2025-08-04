
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Lightbulb, TrendingUp, Target } from 'lucide-react';
import axios from 'axios';

// Mock data for the charts
// const weeklyMoodData = [
//   { day: 'Mon', value: 3, mood: 'anxious' },
//   { day: 'Tue', value: 2, mood: 'sad' },
//   { day: 'Wed', value: 4, mood: 'calm' },
//   { day: 'Thu', value: 5, mood: 'happy' },
//   { day: 'Fri', value: 4, mood: 'calm' },
//   { day: 'Sat', value: 5, mood: 'happy' },
//   { day: 'Sun', value: 5, mood: 'excited' },
// ];

// const monthlyMoodData = [
//   { name: 'Happy', value: 12 },
//   { name: 'Calm', value: 8 },
//   { name: 'Anxious', value: 6 },
//   { name: 'Sad', value: 4 },
//   { name: 'Angry', value: 2 },
// ];


const InsightsPage = () => {
  const [loading, setLoading] = useState(true);
   const [insights, setInsights] = useState<any>(null);
  
   useEffect(() => {
     const userId = JSON.parse(localStorage.getItem('mindful_users') as string).id;
     if (!userId) return;
  
     const fetchInsights = async () => {
       try {
         const res = await axios.get(`http://localhost:4000/api/insights/${userId}`);
         setInsights(res.data);
         console.log(res);
       } catch (error) {
         console.error('Failed to fetch insights:', error);
       } finally {
         setLoading(false);
       }
     };
  
     fetchInsights();
   }, []);
  
   if (loading) {
     return <div className="text-center py-20 text-muted-foreground">Loading insights...</div>;
   }
  
   const {
     weeklyAverageMood,
     mostFrequentMood,
     journalEntries,
     streak,
     weeklyMoodData,
     monthlyMoodData
   } = insights || {};
  
  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#F44336'];
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Emotional Insights</h1>
        <p className="text-muted-foreground">Understand your emotional patterns and get personalized insights</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Weekly Average Mood</CardDescription>
            <CardTitle className="text-2xl">{weeklyAverageMood?.label ?? 'N/A'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{weeklyAverageMood?.improvement || '0%'} improvement</span>
              <ArrowUpRight className="text-green-500 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Most Frequent Mood</CardDescription>
            <CardTitle className="text-2xl">{mostFrequentMood?.mood ?? 'N/A'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm"> {mostFrequentMood?.count ?? 0} occurrences</span>
              <span className="text-xl">{mostFrequentMood?.emoji ?? '🙂'}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Journal Entries</CardDescription>
            <CardTitle className="text-2xl">{journalEntries?.total ?? 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{journalEntries?.thisWeek ?? 0} this week</span>
              <ArrowDownRight className="text-red-500 h-4 w-4" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Consecutive Days</CardDescription>
            <CardTitle className="text-2xl">{streak?.consecutiveDays ?? 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Keep it up!</span>
              <span className="text-xl">🔥</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mood-trends">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="mood-trends">Mood Trends</TabsTrigger>
          <TabsTrigger value="insights">Personalized Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood-trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Mood Trends</CardTitle>
                <CardDescription>See how your mood has changed over the past week</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyMoodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis
                      tickFormatter={(value) => {
                        const moods = ['', 'Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
                        return moods[value] || '';
                      }}
                    />
                    <Tooltip 
                      formatter={(value) => {
                        const moods = ['', 'Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
                        return [moods[value as number], 'Mood Level'];
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Mood Distribution</CardTitle>
                <CardDescription>Breakdown of your emotions over the past month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyMoodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {monthlyMoodData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-primary h-1"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Mood Patterns</CardTitle>
                  <CardDescription>Based on your journal entries</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>You've felt anxious 3 days this week—often mentioning work. Consider scheduling short breaks during your workday to practice mindfulness.</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="bg-amber-500 h-1"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle>Progress Insight</CardTitle>
                  <CardDescription>Your weekly improvement</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Your overall mood has improved by 15% compared to last week. Your journaling consistency is making a difference in your emotional awareness.</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden md:col-span-2">
              <div className="bg-teal-500 h-1"></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <CardTitle>Goal Tracking</CardTitle>
                  <CardDescription>Progress toward your mental health goals</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Mindfulness</span>
                      <span>5/7 days</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Journal Entries</span>
                      <span>12/15 entries</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Positive Reflection</span>
                      <span>8/10 days</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Stress Management",
                description: "Based on your anxiety patterns",
                content: "Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. This can help reduce stress levels quickly."
              },
              {
                title: "Sleep Improvement",
                description: "Your sleep quality affects your mood",
                content: "Consider creating a bedtime routine by turning off screens 1 hour before bed and reading or meditating instead."
              },
              {
                title: "Social Connection",
                description: "Important for emotional wellbeing",
                content: "You've mentioned feeling isolated. Consider scheduling a weekly social activity, even a brief coffee with a friend."
              },
              {
                title: "Physical Activity",
                description: "Boosts mood and reduces anxiety",
                content: "Even short 10-minute walks can significantly improve your mood. Try to incorporate movement into your daily routine."
              },
              {
                title: "Gratitude Practice",
                description: "Shifts focus to positive aspects",
                content: "Consider writing down 3 things you're grateful for each morning to prime your mind for positive thinking."
              },
              {
                title: "Self-compassion",
                description: "Be kind to yourself",
                content: "Notice your negative self-talk and try to speak to yourself with the kindness you'd offer a good friend."
              },
            ].map((item, i) => (
              <Card key={i} className="card-hover">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsPage;
