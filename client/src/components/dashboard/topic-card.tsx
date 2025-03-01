import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type topic = {
  topic: string,
  value: string
}

type topicData = topic[];

const TopicCard = ({ topics }: {
  topics: topicData
}) => {
  
  const topThreeTopics = topics.slice(0, 3).sort();
  
  const data = {
    labels: topThreeTopics.map(item => item.topic),
    datasets: [
      {
        data: topThreeTopics.map(item => parseInt(item.value)),
        backgroundColor: topThreeTopics.map(item => 
          parseInt(item.value) > 70 ? 'rgba(74, 222, 128, 0.8)' : 'rgba(161, 161, 170, 0.8)'
        ),
        borderColor: topThreeTopics.map(item => 
          parseInt(item.value) > 70 ? 'rgba(74, 222, 128, 1)' : 'rgba(161, 161, 170, 1)'
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(161, 161, 170, 0.1)',
        },
        ticks: {
          color: 'rgba(244, 244, 245, 0.7)',
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(244, 244, 245, 0.9)',
          font: {
            weight: 'bold' as const,
          }
        }
      }
    },
  };

  return (
    <div className="flex flex-col justify-center p-6 rounded-lg shadow-lg bg-zinc-900 text-zinc-100 border border-zinc-700 transition-all duration-300 hover:shadow-xl w-full">
      <span className="text-2xl font-bold mb-4 text-white">Top Topics</span>
      <div className="h-48 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopicCard;