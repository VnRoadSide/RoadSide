export function toNormalDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-GB');
}

const currentYear = new Date().getFullYear();
export const yearList = () => Array.from({ length: currentYear - (currentYear - 90) }, (_, i) => `${currentYear - i}`).reverse();
export const monthList = () => Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
export const dayList = () => Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, '0'));