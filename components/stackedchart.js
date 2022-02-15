import { useEffect, useState } from "react";
import styles from "./../styles/Home.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

export default function StackedBarGraph({ options }) {
  const [barProps, setBarProps] = useState(
    options.labels.reduce(
      (a, { key }) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setBarProps({ ...barProps, hover: null });
  };

  const selectBar = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null,
    });
  };

  let tooltip;
  const CustomToolTip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    for (const bar of payload)
      if (bar.dataKey === tooltip)
        return (
          <div className={styles.onTop}>
            <p className={styles.customTooltip}>{`${bar.name}`}</p>
          </div>
        );
    return null;
  };

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  const toPercent = (decimal, fixed = 0) => {
    return `${(decimal * 100).toFixed(fixed)}%`;
  };

  const setYLabel = (title) => {
    if (title === "Reactive WO Data") return "Days";
    else return "Hours";
  };

  return (
    <div name={options.name}>
      <h3 className={styles.chartTitle}>{options.title}</h3>
      <ResponsiveContainer width="100%" aspect={3} margin="5px">
        <BarChart
          width="80%"
          height={400}
          data={options.dataset}
          barGap={10}
          stackOffset="expand"
          reverseStackOrder
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"month"}></XAxis>
          <YAxis tickFormatter={toPercent}>
            <Label
              value={setYLabel(options.title)}
              position="left"
              angle={-90}
              dy={-20}
            />
          </YAxis>
          <Tooltip content={CustomToolTip} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            height={36}
            wrapperStyle={{
              paddingBottom: 10,
            }}
            onClick={selectBar}
            onMouseOver={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseLeave}
          />
          {options.labels.map((label, index) => (
            <Bar
              key={index}
              dataKey={label.key}
              name={label.name}
              fill={label.color}
              hide={barProps[label.key] === true}
              fillOpacity={Number(
                barProps.hover === label.key || !barProps.hover ? 1 : 0.6
              )}
              onMouseOver={() => (tooltip = label.key)}
              stackId="a"
            >
              <LabelList
                dataKey={label.key}
                className={styles.label}
                position="center"
                formatter={(value) => new Intl.NumberFormat("en").format(value)}
                onMouseOver={() => (tooltip = label.key)}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
