'use client';

// Wrapper that suppresses the SSR/hydration mismatch ion-icons cause
// (the browser script adds role/class/aria-label after server render)
export default function IonIcon({ name, style }) {
  return <ion-icon name={name} style={style} suppressHydrationWarning />;
}
