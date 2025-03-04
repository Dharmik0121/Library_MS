export const calculateFine = (dueDate) => {
  const finePerHour = 10;
  const today = new Date();
  if (today > dueDate) {
    const latHours = Math.ceil((today - dueDate) / (1000 * 60 * 60));
    const fine = latHours * finePerHour;
    return fine;
  }
  return 0;
};
