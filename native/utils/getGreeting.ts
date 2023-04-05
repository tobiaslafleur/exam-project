export const getGreeting = (name: string): string => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return `God morgon, ${name}!`;
  } else if (currentHour < 18) {
    return `God eftermiddag, ${name}!`;
  } else if (currentHour < 22) {
    return `God kväll, ${name}!`;
  } else {
    return `God natt, ${name}!`;
  }
};
