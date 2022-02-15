import styles from "./layout.module.css";
import NavBar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="content">
      <NavBar />
      {children}
    </div>
  );
}
