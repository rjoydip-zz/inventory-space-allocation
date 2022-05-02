import { Toaster } from "react-hot-toast";

import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <Toaster />
    </>
  )
}