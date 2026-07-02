'use client';

import { useState } from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';

const RESUME_PATH = '/resume.pdf';

export default function ResumeApp() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-full flex-col bg-zinc-900 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <FileText className="h-4 w-4" /> resume.pdf
        </div>
        <div className="flex items-center gap-2">
          
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs hover:bg-white/20"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open
          </a>
          <a
            href={RESUME_PATH}
            download
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs hover:bg-white/20"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </div>

      <div className="flex-1 bg-zinc-800">
        {!failed ? (
          <object
            data={`${RESUME_PATH}#toolbar=0&view=FitH`}
            type="application/pdf"
            className="h-full w-full"
            onError={() => setFailed(true)}
          >
            {/* object's children render only if the browser can't display the PDF */}
            <div className="flex h-full items-center justify-center text-sm text-white/50">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 opacity-40" />
                <p className="mt-3">Your browser can&apos;t preview PDFs inline.</p>
                <a href={RESUME_PATH} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-sky-400 underline">
                  Open resume.pdf in a new tab
                </a>
              </div>
            </div>
          </object>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/50">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 opacity-40" />
              <p className="mt-3">PDF preview unavailable.</p>
              <p className="mt-1 text-xs">
                Add your file at <code className="rounded bg-white/10 px-1">public/resume.pdf</code>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}