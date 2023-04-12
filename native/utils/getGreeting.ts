export const getGreeting = (): string => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return `Good morning!`;
  } else if (currentHour < 18) {
    return `Good afternoon!`;
  } else if (currentHour < 22) {
    return `Good evening!`;
  } else {
    return `Good night!`;
  }
};
