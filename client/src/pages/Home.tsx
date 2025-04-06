import Navbar from '@/components/Navbar';
import { Award, BookOpen, Brain, Clock } from 'lucide-react';

const UserDashboard = () => {
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    quizAttempted: 24,
    quizCompleted: 21,
    averageScore: 78,
    questionsAttempted: "18 hours",
    streakDays: 7,
    recentQuizzes: [
      { id: 1, title: "Neural Networks Basics", score: 85, date: "Apr 2" },
      { id: 2, title: "Machine Learning Algorithms", score: 72, date: "Apr 1" },
      { id: 3, title: "Natural Language Processing", score: 91, date: "Mar 30" }
    ]
  };

  return (
    <Navbar>
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
            <p className="text-neutral-600 dark:text-neutral-400">Welcome back, {userData.name}</p>
          </div>
          <div className="p-2 px-4 bg-indigo-600 text-white rounded-lg font-medium">
            Start New Quiz
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-3">
                <BookOpen size={20} className="text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="text-lg font-medium dark:text-white">Quizzes Attempted</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{userData.quizAttempted}</p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">{userData.quizCompleted} completed</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                <Award size={20} className="text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-medium dark:text-white">Average Score</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{userData.averageScore}%</p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">Good progress!</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg mr-3">
                <Clock size={20} className="text-amber-600 dark:text-amber-300" />
              </div>
              <h3 className="text-lg font-medium dark:text-white">Study Time</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{userData.questionsAttempted}</p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">Total learning time</p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                <Brain size={20} className="text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-medium dark:text-white">Streak</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{userData.streakDays} days</p>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">Keep it up!</p>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Quizzes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-zinc-700">
                  <th className="text-left py-3 px-2 text-neutral-600 dark:text-neutral-400 font-medium">Quiz Name</th>
                  <th className="text-left py-3 px-2 text-neutral-600 dark:text-neutral-400 font-medium">Date</th>
                  <th className="text-left py-3 px-2 text-neutral-600 dark:text-neutral-400 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {userData.recentQuizzes.map(quiz => (
                  <tr key={quiz.id} className="border-b border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-700">
                    <td className="py-3 px-2 dark:text-white">{quiz.title}</td>
                    <td className="py-3 px-2 text-neutral-600 dark:text-neutral-300">{quiz.date}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-md text-sm font-medium ${
                        quiz.score >= 80 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                        quiz.score >= 60 ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' : 
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {quiz.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              View All Quizzes
            </button>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Subject Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-600 dark:text-neutral-300">Machine Learning</span>
                <span className="text-neutral-600 dark:text-neutral-300">75%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-600 dark:text-neutral-300">Neural Networks</span>
                <span className="text-neutral-600 dark:text-neutral-300">62%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-600 dark:text-neutral-300">Natural Language Processing</span>
                <span className="text-neutral-600 dark:text-neutral-300">88%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-600 dark:text-neutral-300">Computer Vision</span>
                <span className="text-neutral-600 dark:text-neutral-300">45%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-zinc-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Navbar>
  );
};

export default UserDashboard;