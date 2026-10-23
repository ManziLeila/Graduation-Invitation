import { useCallback, useEffect, useState } from 'react';

function parseHash(hash) {
  const raw = (hash || '').replace(/^#/, '').trim();
  if (!raw || raw === 'home') return { view: 'home', section: null };
  if (raw === 'details') return { view: 'details', section: null };
  return { view: 'details', section: raw };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  const sync = useCallback(() => {
    setRoute(parseHash(window.location.hash));
  }, []);

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#home');
    }
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [sync]);

  useEffect(() => {
    if (route.view !== 'details' || !route.section) return;
    const el = document.getElementById(route.section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [route.view, route.section]);

  return route;
}
