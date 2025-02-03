// pages/gpu.js
import { useState, useEffect } from 'react';
import styles from '../styles/GPU.module.css';

export default function GPUPage({ initialGPUs }) {
  // Use the fetched data as initial state
  const [gpus] = useState(initialGPUs);
  const [weights, setWeights] = useState({ price: 1, carbon: 1, wf: 1 });
  const [sortedGPUs, setSortedGPUs] = useState([]);
  const [customGPU, setCustomGPU] = useState({ provider: '', region: '', type: '' });
  const [customResult, setCustomResult] = useState(null);

  useEffect(() => {
    const scored = gpus.map(gpu => {
      const score = 
        (parseFloat(gpu.price) * weights.price) +
        (parseFloat(gpu.carbon) * weights.carbon) +
        (parseFloat(gpu.wf) * weights.wf);
      return { ...gpu, score };
    });
    scored.sort((a, b) => a.score - b.score);
    setSortedGPUs(scored.slice(0, 10));
  }, [weights, gpus]);

  const handleSliderChange = (e) => {
    setWeights({ ...weights, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setCustomResult({ ...customGPU });
    setCustomGPU({ provider: '', region: '', type: '' });
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Choose the best GPU for your metrics.</h1>

      <div className={styles.sliderGroup}>
        <label>
          <span>Cost</span>
          <input 
            type="range" 
            name="price" 
            min="0" 
            max="5" 
            step="0.1" 
            value={weights.price} 
            onChange={handleSliderChange} 
          />
        </label>
        <label>
          <span>Carbon intensity</span>
          <input 
            type="range" 
            name="carbon" 
            min="0" 
            max="5" 
            step="0.1" 
            value={weights.carbon} 
            onChange={handleSliderChange} 
          />
        </label>
        <label>
          <span>Hardware efficiency</span>
          <input 
            type="range" 
            name="wf" 
            min="0" 
            max="5" 
            step="0.1" 
            value={weights.wf} 
            onChange={handleSliderChange} 
          />
        </label>
      </div>

      <table className={styles.gpuTable}>
        <thead>
          <tr>
            <th>Cloud Provider</th>
            <th>Region</th>
            <th>GPU Type</th>
            <th>Price</th>
            <th>Carbon Intensity</th>
            <th>W/FLOPS</th>
          </tr>
        </thead>
        <tbody>
          {sortedGPUs.map(gpu => (
            <tr key={gpu.id}>
              <td>{gpu.provider}</td>
              <td>{gpu.region}</td>
              <td>{gpu.type}</td>
              <td>{gpu.price}</td>
              <td>{gpu.carbon}</td>
              <td>{gpu.wf}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className={styles.customGPU}>
        <h2>Add Your GPU</h2>
        <form onSubmit={handleCustomSubmit} className={styles.customForm}>
          <input 
            type="text" 
            placeholder="Cloud Provider" 
            value={customGPU.provider} 
            onChange={e => setCustomGPU({ ...customGPU, provider: e.target.value })}
            required 
          />
          <input 
            type="text" 
            placeholder="Region" 
            value={customGPU.region} 
            onChange={e => setCustomGPU({ ...customGPU, region: e.target.value })}
            required 
          />
          <input 
            type="text" 
            placeholder="GPU Type" 
            value={customGPU.type} 
            onChange={e => setCustomGPU({ ...customGPU, type: e.target.value })}
            required 
          />
          <button type="submit" className={styles.button}>Add My GPU</button>
        </form>
        {customResult && (
          <div className={styles.customResult}>
            <h3>GPU Added for Comparison</h3>
            <p>Provider: {customResult.provider}</p>
            <p>Region: {customResult.region}</p>
            <p>GPU Type: {customResult.type}</p>
          </div>
        )}
      </section>
    </div>
  );
}

  export async function getStaticProps() {
    // Use the environment variable, falling back to 'http://localhost:3000' if not set.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gpu-data`);
    const data = await res.json();
  
    return {
      props: { initialGPUs: data },
      revalidate: 86400, // revalidate every 24 hours
    };
  }