"use client";

import { Hydrate as RQHydrate } from "@tanstack/react-query";

export const Hydrate = (props) => {
  return <RQHydrate {...props} />;
};
