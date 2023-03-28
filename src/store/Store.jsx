import { configureStore } from "@reduxjs/toolkit";

import Jobs from "../features/jobsSlice";
import Stats from "../features/statsSlice"

export const store = configureStore({
  reducer: {
    jobs: Jobs,
    stats:Stats
  },
});
