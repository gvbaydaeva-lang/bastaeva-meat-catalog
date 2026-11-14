export const analyticsEvents = {
  phoneClick: "phone_click",
  messengerClick: "messenger_click",
  routeClick: "route_click",
  productView: "product_view",
  productInquiry: "product_inquiry"
} as const;

declare global {
  interface Window {
    ym?: (counterId: number, action: "reachGoal", goal: string, params?: Record<string, string>) => void;
  }
}

export function trackYandexEvent(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!counterId || typeof window.ym !== "function") return;
  window.ym(Number(counterId), "reachGoal", event, params);
}
