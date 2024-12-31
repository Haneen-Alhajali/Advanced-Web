import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/dashboard.module.css';

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null); // Ref for sidebar
  const hamburgerRef = useRef(null); // Ref for hamburger button

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        event.target !== hamburgerRef.current
      ) {
        setSidebarOpen(false); // Close the sidebar
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <nav ref={sidebarRef} className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <h1 className={styles.sidebarHeader}>Dashboard</h1>
        <ul className={styles.sidebarNav}>
          <li><button onClick={() => navigate('/dashboard/overview')} className={styles.sidebarBtn}>Overview</button></li>
          <li><button onClick={() => navigate('/dashboard/village-management')} className={styles.sidebarBtn}>Village Management</button></li>
          <li><button onClick={() => navigate('/dashboard/chat')} className={styles.sidebarBtn}>Chat</button></li>
          <li><button onClick={() => navigate('/dashboard/gallery')} className={styles.sidebarBtn}>Gallery</button></li>
        </ul>
        <div className={styles.userInfo}>
          <img src={`../assets/images/${currentUser.role}-avatar.png`} alt="User Avatar" className={styles.userAvatar} />
          <div className={styles.userDetails}>
            <span>{currentUser.fullName}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </nav>
      <div ref={hamburgerRef} className={styles.hamburgerBtn} onClick={handleToggleSidebar}>
        &#9776;
      </div>
    </>
  );
};

export default Sidebar;
