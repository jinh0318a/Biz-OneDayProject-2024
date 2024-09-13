import MainNav from "@/comps/MainNav";
import styles from "./page.module.css";
import MainPage from "@/comps/MainPage";
import "@/css/main.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <MainNav />
      <main className={styles.main}>
        <MainPage />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
