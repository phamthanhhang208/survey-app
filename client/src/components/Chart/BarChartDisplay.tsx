import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const BarChartDisplay = (props: any) => {
  const { labels, dataset } = props;
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChartDisplay;
