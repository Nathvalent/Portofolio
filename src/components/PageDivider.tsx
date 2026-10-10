import React from 'react';

interface PageDividerProps {
  reversed?: boolean;
}

const MARQUEE_TEXT =
  'NATHANAEL VALENT DANANTA — FULL STACK DEVELOPER — AVAILABLE — NVD DESIGN';

const MarqueeTrack: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <div className="page-divider__marquee" aria-hidden="true">
    <div
      className={`page-divider__track${reverse ? ' page-divider__track--reverse' : ''}`}
    >
      {[0, 1].map((copy) => (
        <span className="page-divider__copy" key={copy}>
          {Array.from({ length: 3 }, (_, index) => (
            <span className="page-divider__item" key={index}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

export const PageDivider: React.FC<PageDividerProps> = ({ reversed = false }) => (
  <div className="page-divider" role="separator" aria-orientation="horizontal">
    <MarqueeTrack reverse={reversed} />
  </div>
);
