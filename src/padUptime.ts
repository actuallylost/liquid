export const padUptime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s - h * 3600) / 60);
  s = Math.round(s - h * 3600 - m * 60);

  const hf = h < 10 ? `0${h}` : `${h}`;
  const mf = m < 10 ? `0${m}` : `${m}`;
  const sf = s < 10 ? `0${s}` : `${s}`;

  return `${hf}:${mf}:${sf}`;
};
