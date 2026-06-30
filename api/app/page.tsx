import type { Metadata } from "next";
import PincodeForm from "./components/PincodeForm";

export const metadata: Metadata = {
  title: "Free India Pincode Lookup — Search by District, Block, Office",
  description:
    "Enter any 6-digit Indian pincode to get full address details: state, district, block, office name, circle, region, and division. Free API and packages for JavaScript and Python.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              India Pincode Finder
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Synced with official govt. data from{" "}
              <a
                href="https://data.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                data.gov
              </a>
            </p>
          </div>
          <a
            href="https://github.com/IntegerAlex/IndiaPincodeFinder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star
          </a>
        </div>
      </header>

      <main className="flex flex-1 w-full max-w-3xl mx-auto flex-col py-16 px-6">
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-10">
          Look up any 6-digit Indian pincode for full address details
        </p>
        <PincodeForm />
      </main>

      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span>
            Designed &amp; developed by{" "}
            <a
              href="https://www.akshatkotpalliwar.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Akshat Kotpalliwar
            </a>
          </span>
          <span>
            Issues?{" "}
            <a
              href="https://github.com/IntegerAlex/IndiaPincodeFinder/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              GitHub
            </a>
            {" / "}
            <a
              href="mailto:akshatkot@gmail.com"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              akshat
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
