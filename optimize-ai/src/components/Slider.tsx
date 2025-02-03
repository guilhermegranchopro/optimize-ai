export default function Slider({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value))}
        className="w-full"
      />
      <span className="text-sm text-gray-500">{value}%</span>
    </div>
  )
}

