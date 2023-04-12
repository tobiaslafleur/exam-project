import { formatDistance } from "date-fns";
import { enUS, sv } from "date-fns/locale";
import * as Notifications from "expo-notifications";
import { customDate } from "../interfaces/interfaces";
import { getTask } from "./asyncStorage";

export async function schedulePushNotifications(
  title: string,
  description: string,
  datetime: Date,
  id: string
) {
  const timeStamps: customDate[] = [
    { hours: 0, minutes: 0 },
    { hours: 0, minutes: 5 },
    { hours: 0, minutes: 15 },
    { hours: 0, minutes: 30 },
    { hours: 1, minutes: 0 },
    { hours: 2, minutes: 0 },
  ];

  timeStamps.map(async (time) => {
    const newDate = new Date(datetime);

    newDate.setHours(
      newDate.getHours() - time.hours,
      newDate.getMinutes() - time.minutes
    );

    if (newDate > new Date(Date.now())) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            time.minutes === 0 && time.hours === 0
              ? `It's time to "${title}"`
              : time.minutes === 5 && time.hours === 0
              ? `"${title}" in 5 minutes`
              : `Reminder`,
          body:
            time.minutes === 0 && time.hours === 0
              ? description
              : time.minutes === 5 && time.hours === 0
              ? description
              : `In ${formatDistance(newDate, datetime, {
                  locale: enUS,
                })} it's time to "${title}"`,
          sound: "default",
          data: {
            id: id,
          },
        },
        trigger: {
          date: newDate,
        },
      });
    }
  });
}

export async function cancelNotifications(id: string) {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();

  notifications.map(async (notification) => {
    if (notification.content.data.id === id) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier
      );
    }
  });
}

export async function postPoneNotifications(id: string) {
  await cancelNotifications(id);

  const task = await getTask(id);

  if (!task) return;

  await schedulePushNotifications(
    task.title,
    task.description,
    new Date(task.time),
    task.id
  );
}
