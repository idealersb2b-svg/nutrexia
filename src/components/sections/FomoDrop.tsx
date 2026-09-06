'use client';

export default function FomoDrop() {
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
                <div className="cd-box"><div className="cd-num">03</div><div className="cd-lbl">Days</div></div>
                <div className="cd-box"><div className="cd-num">14</div><div className="cd-lbl">Hrs</div></div>
                <div className="cd-box"><div className="cd-num">45</div><div className="cd-lbl">Min</div></div>
                <div className="cd-box"><div className="cd-num">22</div><div className="cd-lbl">Sec</div></div>
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
