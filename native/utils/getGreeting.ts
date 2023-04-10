export const getGreeting = (): string => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return `God morgon!`;
  } else if (currentHour < 18) {
    return `God eftermiddag!`;
  } else if (currentHour < 22) {
    return `God kväll!`;
  } else {
    return `God natt!`;
  }
};
