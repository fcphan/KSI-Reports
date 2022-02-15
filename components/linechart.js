import { useEffect, useState } from "react";
import styles from "./../styles/Home.module.css";
import * as Utils from "./../utils/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

export default function LineGraph({ options }) {
  const [lineProps, setLineProps] = useState(
    options.labels.reduce(
      (a, { key }) => {
        a[key] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!lineProps[e.dataKey]) {
      setLineProps({ ...lineProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setLineProps({ ...lineProps, hover: null });
  };

  const selectLine = (e) => {
    setLineProps({
      ...lineProps,
      [e.dataKey]: !lineProps[e.dataKey],
      hover: null,
    });
  };

  let tooltip;
  const CustomToolTip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    for (const line of payload)
      if (line.dataKey === tooltip)
        return (
          <div>
            <p
              className={styles.customTooltip}
            >{`${line.name}: ${line.value}`}</p>
          </div>
        );
    return null;
  };

  return (
    <div name={options.name}>
      <h3 className={styles.chartTitle}>{options.title}</h3>
      <ResponsiveContainer width="100%" aspect={3} margin="5px">
        <LineChart
          width="80%"
          height={400}
          data={options.dataset}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={"month"}></XAxis>
          <YAxis padding={{ top: 10 }}>
            <Label value={options.title} position="left" angle={-90} dy={-20} />
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
            onClick={selectLine}
            onMouseOver={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseLeave}
          />
          {options.labels.map((label, index) => (
            <Line
              key={index}
              dataKey={label.key}
              name={label.name}
              stroke={label.color}
              strokeWidth={2}
              hide={lineProps[label.key] === true}
              fillOpacity={Number(
                lineProps.hover === label.key || !lineProps.hover ? 1 : 0.6
              )}
              onMouseOver={() => (tooltip = label.key)}
              activeDot={{ strokeWidth: 1, r: 5 }}
            >
              <LabelList
                dataKey={label.key}
                position="top"
                formatter={(value) => new Intl.NumberFormat("en").format(value)}
                onMouseOver={() => (tooltip = label.key)}
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
