// pages/gpu.js
import { useState, useEffect } from 'react';
import styles from '../styles/GPU.module.css';

const initialGPUs = [
  { id: 1, provider: 'AWS', region: 'us-east-1', type: 'Tesla T4', price: 0.70, carbon: 200, wf: 15 },
  { id: 2, provider: 'GCP', region: 'us-central1', type: 'NVIDIA V100', price: 1.20, carbon: 180, wf: 20 },
  { id: 3, provider: 'Azure', region: 'eastus', type: 'NVIDIA A100', price: 1.50, carbon: 160, wf: 25 },
  { id: 4, provider: 'IBM Cloud', region: 'us-south', type: 'Tesla V100', price: 1.10, carbon: 190, wf: 18 },
  // Add more GPU options as needed
];

export default function GPUPage() {
  const [gpus, setGPUs] = useState(initialGPUs);
  const [weights, setWeights] = useState({ price: 1, carbon: 1, wf: 1 });
  const [sortedGPUs, setSortedGPUs] = useState([]);
  const [customGPU, setCustomGPU] = useState({ provider: '', region: '', type: '', price: '', carbon: '', wf: '' });
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
    const score = 
      (parseFloat(customGPU.price || 0) * weights.price) +
      (parseFloat(customGPU.carbon || 0) * weights.carbon) +
      (parseFloat(customGPU.wf || 0) * weights.wf);
    setCustomResult({ ...customGPU, score });
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Choose the best GPU for your metrics.</h1>

      <div className={styles.sliderGroup}>
        <label>
          Price Weight: {weights.price}
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
          Carbon Intensity Weight: {weights.carbon}
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
          W/FLOPS Weight: {weights.wf}
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
            <th>Score</th>
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
              <td>{gpu.score.toFixed(2)}</td>
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
          <input 
            type="number" 
            placeholder="Price" 
            value={customGPU.price} 
            onChange={e => setCustomGPU({ ...customGPU, price: e.target.value })}
            required 
          />
          <input 
            type="number" 
            placeholder="Carbon Intensity" 
            value={customGPU.carbon} 
            onChange={e => setCustomGPU({ ...customGPU, carbon: e.target.value })}
            required 
          />
          <input 
            type="number" 
            placeholder="W/FLOPS" 
            value={customGPU.wf} 
            onChange={e => setCustomGPU({ ...customGPU, wf: e.target.value })}
            required 
          />
          <button type="submit" className={styles.button}>Evaluate My GPU</button>
        </form>
        {customResult && (
          <div className={styles.customResult}>
            <h3>Evaluation Result</h3>
            <p>Composite Score: {customResult.score.toFixed(2)}</p>
            <p>(Lower is better)</p>
          </div>
        )}
      </section>
    </div>
  );
}
