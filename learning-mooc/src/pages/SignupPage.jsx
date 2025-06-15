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
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
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
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen login-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <img src="public\Icons\website icon.png" alt="Platform Logo" style={{ width: '150px', margin: '0 auto 1rem' }} />
          <h1 className={styles.title}>Signup</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstname" className={styles.label}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white">
                  <path d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-6 8v-1.85q0-1.3.663-2.275Q7.325 14.9 8.45 14.4q1.1-.475 2.325-.713Q12 13.45 13.225 13.688q1.225.237 2.325.712 1.125.5 1.788 1.475Q18 16.85 18 18.15V20Z" />
                </svg>
              </label>
              <input type="text" id="firstname" placeholder="First name" className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastname" className={styles.label}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white">
                  <path d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-6 8v-1.85q0-1.3.663-2.275Q7.325 14.9 8.45 14.4q1.1-.475 2.325-.713Q12 13.45 13.225 13.688q1.225.237 2.325.712 1.125.5 1.788 1.475Q18 16.85 18 18.15V20Z" />
                </svg>
              </label>
              <input type="text" id="lastname" placeholder="Last name" className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>@</label>
              <input type="email" id="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>🔒</label>
              <input type="password" id="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
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
