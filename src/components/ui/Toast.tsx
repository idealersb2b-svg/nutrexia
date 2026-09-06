'use client';

import { useUI } from '../../context/UIContext';
import { useEffect } from 'react';

export default function Toast() {
  const { toastMessage, hideToast } = useUI();

  // Clear toast on unmount
  useEffect(() => {
    return () => hideToast();
  }, [hideToast]);

  return (
    <div className={`toast ${toastMessage ? 'show' : ''}`}>
      <span style={{ fontSize: '16px' }}>✓</span>
      {toastMessage}
    </div>
  );
}
