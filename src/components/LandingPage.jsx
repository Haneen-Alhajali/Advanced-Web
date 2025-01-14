import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import styles from '../assets/css/main.module.css';


const LandingPage = () => (
    <div className={styles.landingBody}>
        <Header />
        <main className={styles.landingContainer}>
        <div className={styles.card}>
            <h2>Explore Villages</h2>
            <p>Discover village details, including demographics and public facilities.</p>
            <Link to="/login" className={styles.btn}>Login</Link>
        </div>
        <div className={styles.card}>
            <h2>Join Us</h2>
            <p>Create an account to manage and explore village data.</p>
            <Link to="/signup" className={styles.btn}>Sign Up</Link>
        </div>
        </main>


        <Footer />
    </div>
);

export default LandingPage;
