import React from 'react';

type LoaderProps = { size?: number };

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width={size ?? 40}
        height={size ?? 40}>
        <circle fill="#042DFF" stroke="#042DFF" strokeWidth="15" r="15" cx="40" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2.4"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"></animate>
        </circle>
        <circle fill="#042DFF" stroke="#042DFF" strokeWidth="15" r="15" cx="100" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2.4"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"></animate>
        </circle>
        <circle fill="#042DFF" stroke="#042DFF" strokeWidth="15" r="15" cx="160" cy="65">
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2.4"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"></animate>
        </circle>
      </svg>
    </div>
  );
};
