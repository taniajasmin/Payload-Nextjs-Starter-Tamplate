"use client";

import React from "react";

/**
 * Passthrough nav wrapper. Payload injects the default nav as children.
 * Kept for slot compatibility; add custom logic here if needed.
 */
const NavClient = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default NavClient;
