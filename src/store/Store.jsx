import { configureStore } from "@reduxjs/toolkit";

import Pages from "../features/pageSlice";

export const store = configureStore({
  reducer: {
    store: Pages,
  },
});
