'use client';

import { useState, useEffect } from 'react';

const MESSAGES = [
  "Raj from Delhi bought trial pack of Rs.249/-",
  "Ayesha from Hyderabad just joined the waitlist",
  "Rahul from Mumbai bought a 1kg subscription",
  "Anjali from Pune bought trial pack of Rs.249/-",
  "Amit from Bangalore just joined the waitlist",
  "Sneha from Chennai bought a 1kg pouch",
  "Vikram from Gurgaon bought a 1kg subscription",
  "Priya from Ahmedabad just joined the waitlist",
  "Karan from Chandigarh bought trial pack of Rs.249/-",
  "Neha from Noida bought a 1kg pouch",
  "Rohan from Jaipur just joined the waitlist",
  "Pooja from Kolkata bought trial pack of Rs.249/-",
  "Suresh from Hyderabad bought a 1kg subscription",
  "Divya from Delhi just joined the waitlist",
  "Manish from Mumbai bought a 1kg pouch",
  "Ritu from Pune bought trial pack of Rs.249/-",
  "Gaurav from Bangalore bought a 1kg subscription",
  "Nisha from Ahmedabad just joined the waitlist",
  "Arjun from Gurgaon bought trial pack of Rs.249/-",
  "Kavita from Chennai bought a 1kg pouch"
];

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [currentMsg, setCurrentMsg] = useState("");

  useEffect(() => {
    let showTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    
    const cyclePopup = () => {
      // Pick a random message
      const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setCurrentMsg(randomMsg);
      setVisible(true);
      
      // Hide after 5 seconds
      hideTimeout = setTimeout(() => {
        setVisible(false);
        // Show again after 15 seconds
        showTimeout = setTimeout(cyclePopup, 15000);
      }, 5000);
    };

    // Initial delay of 10 seconds before first popup
    showTimeout = setTimeout(cyclePopup, 10000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className={`social-popup ${visible ? 'show' : ''}`}>
      <div className="social-icon-wrapper">
        <span className="social-icon">🛍️</span>
      </div>
      <div className="social-text">
        <span dangerouslySetInnerHTML={{
          __html: currentMsg.replace(
            /^([A-Za-z]+ from [A-Za-z]+)(.*)$/, 
            '<b>$1</b>$2'
          )
        }} />
      </div>
    </div>
  );
}
