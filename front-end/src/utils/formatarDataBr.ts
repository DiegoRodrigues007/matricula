export const formataDataBR = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formataDataISO = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
};
