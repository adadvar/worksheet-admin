import { differenceInDays, formatDistance, parseISO } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: any, dateStr2: any) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: any) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {} as any) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fa-IR", {
    currency: "IRR",
  }).format(value);

export function formatDuration(duration: string): string {
  const regex = /(\d+d)?(\d+h)?(\d+m)?/;
  const match = duration.match(regex);

  if (!match) {
    return "Invalid duration format";
  }

  const days = parseInt(match[1]) || 0;
  const hours = parseInt(match[2]) || 0;
  const minutes = parseInt(match[3]) || 0;

  let result = "";

  if (days > 0) {
    result += `${days} روز `;
  }

  if (hours > 0) {
    result += `${hours} ساعت `;
  }

  if (minutes > 0) {
    if (minutes < 60) {
      result += "کمتر از یک ساعت";
    } else {
      result += `${minutes} دقیقه`;
    }
  }

  return result.trim();
}
