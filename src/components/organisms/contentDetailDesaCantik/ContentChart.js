import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

const ContentChart = ({ data, title }) => {
  const chartKey = JSON.stringify(data);  // Unique key for the chart

  useEffect(() => {
    console.log("ContentChart data updated:", data);
  }, [data]);

  if (!data || !data.Labels || !data.Data) {
    return <div>Loading...</div>;  // Handle cases where data might be undefined
  }

  return (
    <div>
      <Bar
        key={chartKey}  // Force re-render with a unique key
        data={{
          labels: data.Labels,
          datasets: [
            {
              label: title || "Chart Title",
              data: data.Data,
              backgroundColor: data.BackgroundColor || 'rgba(75,192,192,0.4)',
            },
          ],
        }}
        height={300}
        width={500}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ContentChart;

