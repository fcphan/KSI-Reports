import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import BarGraph from "../../components/barchart";
import LineGraph from "../../components/linechart";
import { useEffect, useState } from "react";
import * as Utils from "../../utils/utils";
import { Button } from "react-bootstrap";

const getYear = () => {
  let year = new Date().getFullYear();
  return year.toString();
};

let options = {
  shop: "ENERGY MGMT",
  year: getYear(),
};

export default function Electrical() {
  // Create React hooks for each section of the report
  const [year, setYear] = useState(Utils.yearList());
  const [TAdataset, setTAdataset] = useState([]);
  const [WOdataset, setWOdataset] = useState([]);
  const [PMdataset, setPMdataset] = useState([]);
  const [PRJdataset, setPRJdataset] = useState([]);
  const [RCTdataset, setRCTdataset] = useState([]);
  const [EMPdataset, setEMPdataset] = useState([]);

  // Function that will make multiple calls to the API to get data
  const getData = async () => {
    // Time Analysis API Call
    try {
      const TIME_ANALYSIS_URL = `${Utils.URLS.TIME_ANALYSIS_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(TIME_ANALYSIS_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          reg_hrs: parseFloat(idx.total_reg_hours.replace(",", "")),
          ot_hrs: parseFloat(idx.total_overtime_hours.replace(",", "")),
          react_hrs: parseFloat(idx.reactive_hours.replace(",", "")),
          proj_hrs: parseFloat(idx.project_hours.replace(",", "")),
          pm_hrs: parseFloat(idx.pm_hours.replace(",", "")),
          stand_hrs: parseFloat(idx.standing_hours.replace(",", "")),
          admin_hrs: parseFloat(idx.admin_hours.replace(",", "")),
          leave_hrs: parseFloat(idx.leave_hours.replace(",", "")),
        });
      });
      setTAdataset(points);
    } catch (error) {
      console.error(error.message);
    }

    // WO Phase API Call
    try {
      const WO_PHASE_URL = `${Utils.URLS.WO_PHASE_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(WO_PHASE_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          created:
            parseFloat(idx.asg_created.replace(",", "")) +
            parseFloat(idx.unasg_created.replace(",", "")),
          open:
            parseFloat(idx.asg_open.replace(",", "")) +
            parseFloat(idx.unasg_open.replace(",", "")),
          completed:
            parseFloat(idx.asg_completed.replace(",", "")) +
            parseFloat(idx.unasg_completed.replace(",", "")),
          cancelled:
            parseFloat(idx.asg_cancelled.replace(",", "")) +
            parseFloat(idx.unasg_cancelled.replace(",", "")),
          closed:
            parseFloat(idx.asg_closed.replace(",", "")) +
            parseFloat(idx.unasg_closed.replace(",", "")),
          standing:
            parseFloat(idx.asg_standing.replace(",", "")) +
            parseFloat(idx.unasg_standing.replace(",", "")),
          planned:
            parseFloat(idx.asg_planned.replace(",", "")) +
            parseFloat(idx.unasg_planned.replace(",", "")),
        });
      });
      setWOdataset(points);
    } catch (error) {
      console.error(error.message);
    }

    // PM WO API Call
    try {
      const PM_WO_URL = `${Utils.URLS.PM_WO_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(PM_WO_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          created:
            parseFloat(idx.asg_created.replace(",", "")) +
            parseFloat(idx.unasg_created.replace(",", "")),
          open:
            parseFloat(idx.asg_open.replace(",", "")) +
            parseFloat(idx.unasg_open.replace(",", "")),
          completed:
            parseFloat(idx.asg_completed.replace(",", "")) +
            parseFloat(idx.unasg_completed.replace(",", "")),
          cancelled:
            parseFloat(idx.asg_cancelled.replace(",", "")) +
            parseFloat(idx.unasg_cancelled.replace(",", "")),
          closed:
            parseFloat(idx.asg_closed.replace(",", "")) +
            parseFloat(idx.unasg_closed.replace(",", "")),
        });
      });
      setPMdataset(points);
    } catch (error) {
      console.error(error.message);
    }

    // Project WO API Call
    try {
      const PROJECT_WO_URL = `${Utils.URLS.PROJECT_WO_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(PROJECT_WO_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          created:
            parseFloat(idx.asg_created.replace(",", "")) +
            parseFloat(idx.unasg_created.replace(",", "")),
          completed:
            parseFloat(idx.asg_completed.replace(",", "")) +
            parseFloat(idx.unasg_completed.replace(",", "")),
          cancelled:
            parseFloat(idx.asg_cancelled.replace(",", "")) +
            parseFloat(idx.unasg_cancelled.replace(",", "")),
          closed:
            parseFloat(idx.asg_closed.replace(",", "")) +
            parseFloat(idx.unasg_closed.replace(",", "")),
        });
      });
      setPRJdataset(points);
    } catch (error) {
      console.error(error.message);
    }

    // Reactive WO API Call
    try {
      const REACTIVE_WO_URL = `${Utils.URLS.REACTIVE_WO_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(REACTIVE_WO_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          avg_days: parseFloat(idx.avg_days.replace(",", "")),
        });
      });
      setRCTdataset(points);
    } catch (error) {
      console.error(error.message);
    }

    // Total Employee Hours API Call
    try {
      const EMPLOYEE_HOURS_URL = `${Utils.URLS.EMPLOYEE_HOURS_URL}&year=${options.year}&shop=${options.shop}`;
      const response = await fetch(EMPLOYEE_HOURS_URL);
      const jsonData = await response.json();
      let points = [];
      jsonData.message.forEach((idx) => {
        points.push({
          month: idx.month,
          admin_hrs: parseFloat(idx.admin_hrs.replace(",", "")),
          proj_hrs: parseFloat(idx.proj_hrs.replace(",", "")),
          react_prev_hrs: parseFloat(idx.react_prev_hrs.replace(",", "")),
        });
      });
      setEMPdataset(points);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Create objects to send to charts
  let TimeAnalysisObj = {
    labels: Utils.TIME_ANALYSIS_LABELS,
    title: "Time Availability Data and Time Analysis Data",
    dataset: TAdataset,
    name: "TA_chart",
  };
  let WOPhaseObj = {
    labels: Utils.WO_PHASE_LABELS,
    title: "Work Order Phase Analysis",
    dataset: WOdataset,
    name: "WO_chart",
  };
  let PMObj = {
    labels: Utils.PM_LABELS,
    title: "PM WO Data",
    dataset: PMdataset,
    name: "PM_chart",
  };
  let ProjectObj = {
    labels: Utils.PROJECT_LABELS,
    title: "Project WO Data",
    dataset: PRJdataset,
    name: "PROJ_chart",
  };
  let ReactiveObj = {
    labels: Utils.REACTIVE_LABELS,
    title: "Reactive WO Data",
    dataset: RCTdataset,
    name: "REACT_chart",
  };
  let EmployeeHoursObj = {
    labels: Utils.EMPLOYEE_HOURS_LABELS,
    title: "Total Hours by Employee",
    dataset: EMPdataset,
    name: "EMP_chart",
  };

  // Create toggles for chart visibility
  let toggleTA = () => {
    let TA = document.getElementsByName("TA_chart");
    let button = document.getElementsByName("TA_toggle");
    buttonToggle(TA[0], button[0]);
  };
  let toggleWO = () => {
    let WO = document.getElementsByName("WO_chart");
    let button = document.getElementsByName("WO_toggle");
    buttonToggle(WO[0], button[0]);
  };
  let togglePM = () => {
    let PM = document.getElementsByName("PM_chart");
    let button = document.getElementsByName("PM_toggle");
    buttonToggle(PM[0], button[0]);
  };
  let togglePROJ = () => {
    let PROJ = document.getElementsByName("PROJ_chart");
    let button = document.getElementsByName("PROJ_toggle");
    buttonToggle(PROJ[0], button[0]);
  };
  let toggleREACT = () => {
    let REACT = document.getElementsByName("REACT_chart");
    let button = document.getElementsByName("REACT_toggle");
    buttonToggle(REACT[0], button[0]);
  };
  let toggleEMP = () => {
    let EMP = document.getElementsByName("EMP_chart");
    let button = document.getElementsByName("EMP_toggle");
    buttonToggle(EMP[0], button[0]);
  };
  let buttonToggle = (chart, button) => {
    if (chart.style.display === "none") {
      chart.style.display = "block";
    } else {
      chart.style.display = "none";
    }
  };

  const updateYearOption = (new_year) => {
    options.year = new_year;
    getData();
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Energy Management Shop KSI Report</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Energy Management Shop</h1>
          <p>Select a fiscal year to view KSI reports</p>
          <select onChange={(e) => updateYearOption(e.target.value)}>
            {year.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <h2>Reports for FY {options.year}</h2>
        </main>
        <div className={styles.btngroup}>
          <Button className={styles.btn} name="TA_toggle" onClick={toggleTA}>
            Toggle Time Analysis
          </Button>
          <Button className={styles.btn} name="WO_toggle" onClick={toggleWO}>
            Toggle WO Phase Analysis
          </Button>
          <Button className={styles.btn} name="PM_toggle" onClick={togglePM}>
            Toggle PM WO Analysis
          </Button>
          <Button
            className={styles.btn}
            name="PROJ_toggle"
            onClick={togglePROJ}
          >
            Toggle Project WO Analysis
          </Button>
          <Button
            className={styles.btn}
            name="REACT_toggle"
            onClick={toggleREACT}
          >
            Toggle Reactive WO Analysis
          </Button>
        </div>
        <BarGraph options={TimeAnalysisObj} />
        <LineGraph options={WOPhaseObj} />
        <BarGraph options={PMObj} />
        <BarGraph options={ProjectObj} />
        <LineGraph options={ReactiveObj} />
      </div>
    </Layout>
  );
}
