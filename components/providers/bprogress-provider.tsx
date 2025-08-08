"use client"

import { ProgressProvider } from '@bprogress/next/app'
import React from "react";


export function ProgressProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider height="3px" color="#22c55e" options={{ showSpinner: false }}>
      {children}
    </ProgressProvider>
  );
}