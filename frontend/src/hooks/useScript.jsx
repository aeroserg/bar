import { useEffect } from 'react';

const useScript = (url, origin, integrity) => {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = url;
    integrity ? script.integrity = integrity : null; 
    origin ? script.crossOrigin = origin : null;
    
    document.body.appendChild(script);
  }, [url, origin, integrity]);
};

export default useScript;