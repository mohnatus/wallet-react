import { FC } from "react";
import { TTag } from "../../../types";
import { useSelector } from "react-redux";
import { selectItemsByIntervals } from "../statsSliсe";
import { formatInterval } from "../../../utils/intervals";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { formatDate } from "../../../utils/date";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const chartOptions = {
  responsive: true,
};

export type TTagStatsProps = {
  tag: TTag;
};

export const TagStats: FC<TTagStatsProps> = ({ tag }) => {
  const itemsByIntervals = useSelector(selectItemsByIntervals);

  const labels = itemsByIntervals.map((period) => {
    if (period.period.name) return period.period.name;
    return formatDate(period.interval[0]);
  });

  const stats = itemsByIntervals.map((period) => {
    const { items } = period;
    const tagItems = items.filter((i) => i.tag === tag.id);
    const tagTotal = tagItems.reduce((total, item) => total + item.price, 0);

    return tagTotal;
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: stats,
      },
    ],
  };

  return (
    <div>
      <h2>{tag.name}</h2>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};
