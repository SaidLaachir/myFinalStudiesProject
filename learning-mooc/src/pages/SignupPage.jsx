// SignupPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from "framer-motion";

function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setErrors({});

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!email.endsWith("@uit.ac.ma")) newErrors.email = "Email must end with @uit.ac.ma.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (password !== repeatPassword) newErrors.repeatPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      localStorage.setItem("userFirstName", firstName);
      navigate("/universities");
    } catch (err) {
      setErrors({ general: "Email already in use or invalid input." });
    }
  };

  return (
    <motion.div className="min-h-screen login-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <img src="/Icons/9raOnlinePic.png" alt="Platform Logo" style={{ width: '150px', margin: '0 auto 1rem' }} />
          <h1 className={styles.title}>Signup</h1>
          {errors.general && <p className={styles.error}>{errors.general}</p>}
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
              <label htmlFor="firstname" className={styles.label}>👤</label>
              <input type="text" id="firstname" placeholder="First name" className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
              <label htmlFor="lastname" className={styles.label}>👤</label>
              <input type="text" id="lastname" placeholder="Last name" className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
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
            <div className={styles.inputGroup}>
              {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
              <label htmlFor="repeat-password" className={styles.label}>🔒</label>
              <input type="password" id="repeat-password" placeholder="Repeat Password" className={styles.input} value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            </div>
            <button type="submit" className={styles.button}>Signup</button>
          </form>
          <p className={styles.linkText}>
            Already have an account? <Link to="/login" className={styles.link}>Login</Link>
          </p>
        </div>
        <div className={styles.rightPane}></div>
      </div>
    </motion.div>
  );
}

export default SignupPage;
