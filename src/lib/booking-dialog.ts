import { useSyncExternalStore } from "react";

export type BookingPrefill = {
  vehicle?: string;
  pickup?: string;
  drop?: string;
  date?: string;
};

type State = { open: boolean; prefill: BookingPrefill };
let state: State = { open: false, prefill: {} };
const listeners = new Set<() => void>();
const set = (s: State) => {
  state = s;
  listeners.forEach((l) => l());
};

export const openBooking = (prefill: BookingPrefill = {}) => set({ open: true, prefill });
export const closeBooking = () => set({ ...state, open: false });
export const useBookingDialog = () =>
  useSyncExternalStore(
    (cb) => (listeners.add(cb), () => listeners.delete(cb)),
    () => state,
    () => state,
  );
