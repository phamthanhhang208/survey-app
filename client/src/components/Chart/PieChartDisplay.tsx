import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartDisplay = (props: any) => {
	const { labels, dataset } = props;
	const data = {
		labels: labels,
		datasets: [
			{
				data: dataset,
				backgroundColor: [
					"#3366CC",
					"#DC3912",
					"#FF9900",
					"#109618",
					"#990099",
					"#3B3EAC",
					"#0099C6",
					"#DD4477",
					"#66AA00",
					"#B82E2E",
					"#316395",
					"#994499",
					"#22AA99",
					"#AAAA11",
					"#6633CC",
					"#E67300",
					"#8B0707",
					"#329262",
					"#5574A6",
					"#651067",
				],
				// borderColor: [
				// 	"rgba(255, 99, 132, 1)",
				// 	"rgba(54, 162, 235, 1)",
				// 	"rgba(255, 206, 86, 1)",
				// 	"rgba(75, 192, 192, 1)",
				// 	"rgba(153, 102, 255, 1)",
				// 	"rgba(255, 159, 64, 1)",
				// ],
				//borderWidth: 1,
			},
		],
	};
	return <Pie data={data} />;
};

export default PieChartDisplay;
