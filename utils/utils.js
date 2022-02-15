export const COLLECTIONS = [
  "Time Availability Data and Time Analysis Data",
  "Work Order Phase Analysis",
  "PM WO Data",
  "Project WO Data",
  "Reactive WO Data",
  "Total Hours by Employee",
];

export const TIME_ANALYSIS_LABELS = [
  { key: "reg_hrs", name: "Regular Hours", color: "#8884d8" },
  { key: "ot_hrs", name: "Overtime Hours", color: "#82ca9d" },
  { key: "react_hrs", name: "Reactive Hours", color: "#81cc2d" },
  { key: "proj_hrs", name: "Project Hours", color: "#3292D3" },
  { key: "pm_hrs", name: "PM Hours", color: "#164C71" },
  { key: "stand_hrs", name: "Standing Hours", color: "#70BAED" },
  { key: "admin_hrs", name: "Admin Hours", color: "#70EDEA" },
  { key: "leave_hrs", name: "Leave Hours", color: "#12A8A5" },
];

export const WO_PHASE_LABELS = [
  {
    key: "created",
    name: "Phases Created",
    color: "#d3a0c3",
  },
  {
    key: "open",
    name: "Phases Open",
    color: "#eea9f5",
  },
  {
    key: "completed",
    name: "Phases Completed",
    color: "#408c3c",
  },
  {
    key: "cancelled",
    name: "Phases Canceled",
    color: "#af3a74",
  },
  {
    key: "closed",
    name: "Phases Closed",
    color: "#1970e7",
  },
  {
    key: "standing",
    name: "Phases Standing",
    color: "#23fb3e",
  },
  {
    key: "planned",
    name: "Phases Planned",
    color: "#7103fe",
  },
];

export const PM_LABELS = [
  {
    key: "created",
    name: "Created PM WO Phases",
    color: "#8104f0",
  },
  {
    key: "open",
    name: "Open PM WO Phases",
    color: "#4cd91d",
  },
  {
    key: "completed",
    name: "Completed PM WO Phases",
    color: "#b61d29",
  },
  {
    key: "cancelled",
    name: "Canceled PM WO Phases",
    color: "#1f71af",
  },
  {
    key: "closed",
    name: "Closed PM WO Phases",
    color: "#7c6521",
  },
];

export const PROJECT_LABELS = [
  {
    key: "created",
    name: "Created Project WO Phases",
    color: "#a287ce",
  },
  {
    key: "completed",
    name: "Completed Project WO Phases",
    color: "#927e6c",
  },
  {
    key: "cancelled",
    name: "Canceled Project WO Phases",
    color: "#e7d4b7",
  },
  {
    key: "closed",
    name: "Closed Project WO Phases",
    color: "#ad71b9",
  },
];

export const REACTIVE_LABELS = [
  { key: "avg_days", name: "Average Days to Complete", color: "#5349d7" },
];

export const EMPLOYEE_HOURS_LABELS = [
  { key: "admin_hrs", name: "Admin Hours", color: "#84eeef" },
  { key: "proj_hrs", name: "Project Hours", color: "#0a74e5" },
  { key: "react_prev_hrs", name: "React/Prev Hours", color: "#31731f" },
];

export const URLS = {
  TIME_ANALYSIS_URL: `/api/ksiData?collection=${COLLECTIONS[0]}`,
  WO_PHASE_URL: `/api/ksiData?collection=${COLLECTIONS[1]}`,
  PM_WO_URL: `/api/ksiData?collection=${COLLECTIONS[2]}`,
  PROJECT_WO_URL: `/api/ksiData?collection=${COLLECTIONS[3]}`,
  REACTIVE_WO_URL: `/api/ksiData?collection=${COLLECTIONS[4]}`,
  EMPLOYEE_HOURS_URL: `/api/ksiData?collection=${COLLECTIONS[5]}`,
};

export const yearList = () => {
  const current_year = new Date().getFullYear();
  const starting_year = current_year - 5;

  let years = [];
  for (let i = current_year; i > starting_year - 1; --i)
    years.push(i.toString());
  return years;
};

export const LEGEND_SHAPES = [
  "square",
  "rect",
  "circle",
  "cross",
  "diamond",
  "square",
  "star",
  "triangle",
];
