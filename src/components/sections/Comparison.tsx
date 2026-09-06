export default function Comparison() {
  return (
    <section style={{ background: 'var(--cream-2)' }}>
      <div className="wrap">
        <div className="sec-head center">
          <span className="sec-tag">Why not just grab another protein powder</span>
          <h2>Same shelf, very different mornings.</h2>
        </div>
        <div className="comp-wrap">
          <table className="comp">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Protein / serving</th>
                <th>Climate story</th>
                <th>Price (₹)</th>
                <th>Common pain point</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Slurrp Farm</td>
                <td>6–8g</td>
                <td>No</td>
                <td>30–40</td>
                <td>Carb-heavy</td>
              </tr>
              <tr>
                <td>Millet Amma</td>
                <td>8–12g</td>
                <td>No</td>
                <td>35–45</td>
                <td>Low protein</td>
              </tr>
              <tr>
                <td>Origin Nutrition</td>
                <td>15–20g (powder)</td>
                <td>Limited</td>
                <td>60–80</td>
                <td>Not breakfast-focused</td>
              </tr>
              <tr className="hero-row">
                <td>Nutrexia <span className="badge-win">You are here</span></td>
                <td>20–25g</td>
                <td>Yes</td>
                <td>35–60</td>
                <td>Climate + protein, solved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
