export const getGreeting = (name: string): string => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return `Good morning, ${name}!`;
  } else if (currentHour < 18) {
    return `Good afternoon, ${name}!`;
  } else if (currentHour < 22) {
    return `Good evening, ${name}!`;
  } else {
    return `Good night, ${name}!`;
  }
};
