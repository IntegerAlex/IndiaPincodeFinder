"use client";

import { useRef, useState } from "react";

interface PincodeData {
  pincode: number;
  district: string;
  block: string;
  state: string;
  officename: string;
  circlename: string;
  regionname: string;
  divisionname: string;
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
    >
      {copied ? (
        <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={children} label="Copy" />
      </div>
      <pre className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm overflow-x-auto whitespace-pre-wrap">
        {children}
      </pre>
    </div>
  );
}

export default function PincodeForm() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<PincodeData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
    if (result || error) {
      setResult(null);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/pincode?pincode=${pincode}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  const resultAsText = result
    ? Object.entries(result)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")
    : "";

  const jsCode = `import {
  pinToAddress,
  pinToState,
  pinToDistrict,
  pinToTaluka,
  searchPincodes,
} from "india-pincode-finder";

pinToAddress(411001);
// → { state: "Maharashtra", district: "Pune", ... }

searchPincodes("pune");
// → [{ pincode: 410301, ... }, ...]`;

  const pyCode = `from indiapincodefinder import (
    pin_to_address,
    pin_to_state,
    pin_to_district,
    pin_to_taluka,
    search_pincodes,
)

pin_to_address(411001)
# → {'state': 'Maharashtra', 'district': 'Pune', ...}

search_pincodes("pune")
# → [{'pincode': 410301, ...}, ...]`;

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          value={pincode}
          onChange={handleChange}
          placeholder="Enter 6-digit pincode"
          className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-zinc-500"
          maxLength={6}
          autoFocus
        />
        <button
          type="submit"
          disabled={pincode.length !== 6 || loading}
          className="px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {loading ? "..." : "Look up"}
        </button>
      </form>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 mb-12 relative">
          <div className="absolute top-4 right-4">
            <CopyButton text={resultAsText} label="Copy" />
          </div>
          <h2 className="text-xl font-semibold mb-4 font-mono">
            {result.pincode}
          </h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {[
              ["State", result.state],
              ["District", result.district],
              ["Block", result.block],
              ["Office", result.officename],
              ["Circle", result.circlename],
              ["Region", result.regionname],
              ["Division", result.divisionname],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 mt-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Installation & Usage</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">JavaScript / Node.js</h3>
            <CodeBlock label="Copy">{"npm install india-pincode-finder"}</CodeBlock>
            <div className="mt-3">
              <CodeBlock label="Copy">{jsCode}</CodeBlock>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Python</h3>
            <CodeBlock label="Copy">{"pip install indiapincodefinder"}</CodeBlock>
            <div className="mt-3">
              <CodeBlock label="Copy">{pyCode}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
