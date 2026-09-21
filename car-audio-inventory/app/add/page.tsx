// Location: app/add/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddComponentPage() {
  const [type, setType] = useState('subwoofer');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    setLoading(false);
    router.push('/'); 
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Add Audio Equipment</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <label className="block mb-4">
          <span className="text-gray-300">Select Component Type:</span>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="mt-2 block w-full bg-gray-900 text-white border border-gray-600 rounded p-2"
          >
            <option value="subwoofer">Compact Active Subwoofer</option>
            <option value="equalizer">Graphic Equalizer</option>
            <option value="headunit">1-DIN Retractable Screen</option>
          </select>
        </label>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full transition-colors"
        >
          {loading ? 'Installing...' : 'Add to Build'}
        </button>
      </form>
    </div>
  );
}