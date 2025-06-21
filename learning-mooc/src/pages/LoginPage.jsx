// LoginPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from "framer-motion";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!email.endsWith("@uit.ac.ma")) newErrors.email = "Only @uit.ac.ma emails are allowed.";

    if (!password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.firstName) {
          localStorage.setItem("userFirstName", data.firstName);
        }
      }

      navigate("/universities");
    } catch (err) {
      setErrors({ general: "Invalid email or password." });
    }
  };

  return (
    <motion.div className="min-h-screen login-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <img src="/Icons/9raOnlinePic.png" alt="Platform Logo" style={{ width: '150px', margin: '0 auto 1rem' }} />
          <h1 className={styles.title}>Login</h1>
          {errors.general && <p className={styles.error}>{errors.general}</p>}
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              {errors.email && <p className={styles.error}>{errors.email}</p>}
              <label htmlFor="email" className={styles.label}>@</label>
              <input type="email" id="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              {errors.password && <p className={styles.error}>{errors.password}</p>}
              <label htmlFor="password" className={styles.label}>🔒</label>
              <input type="password" id="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
          <p className={styles.linkText}>
            New here? <Link to="/signup" className={styles.link}>Create an Account</Link>
          </p>
        </div>
        <div className={styles.rightPane}></div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
