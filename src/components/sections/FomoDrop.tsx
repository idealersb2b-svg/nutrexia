'use client';

import { useState, useEffect } from 'react';

export default function FomoDrop() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 45,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <section>
      <div className="wrap">
        <div className="drop">
          <div className="drop-inner">
            <div>
              <span className="eyebrow-chip" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--gold)' }}>
                <span className="dot"></span>Founding member window
              </span>
              <h3>Founding pricing disappears when the clock hits zero.</h3>
              <p>We roast one batch per quarter with our farmer cooperative — no infinite shelf stock, no discount games. Once this batch sells out, price goes to full retail for everyone after you.</p>
              
              <div className="countdown">
                <div className="cd-box"><div className="cd-num">{pad(timeLeft.days)}</div><div className="cd-lbl">Days</div></div>
                <div className="cd-box"><div className="cd-num">{pad(timeLeft.hours)}</div><div className="cd-lbl">Hrs</div></div>
                <div className="cd-box"><div className="cd-num">{pad(timeLeft.minutes)}</div><div className="cd-lbl">Min</div></div>
                <div className="cd-box"><div className="cd-num">{pad(timeLeft.seconds)}</div><div className="cd-lbl">Sec</div></div>
              </div>
              
              <div className="stock-wrap">
                <div className="stock-top"><span>Batch claimed</span><span>742 / 1000 kg</span></div>
                <div className="stock-bar"><div className="stock-fill" style={{ width: '74.2%' }}></div></div>
              </div>
            </div>
            
            <div className="drop-card">
              <div className="per">Founding member price · locked forever</div>
              <div className="price">₹50<span className="was">₹68</span></div>
              <div className="per" style={{ marginTop: '6px' }}>per 30g serving</div>
              <a href="#shop" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '14px' }}>Claim founding price</a>
              <div className="live-note">
                <span className="live-dot"></span> 6 people are viewing this drop right now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
