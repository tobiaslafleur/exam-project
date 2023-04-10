import { formatDistance } from "date-fns";
import { sv } from "date-fns/locale";
import * as Notifications from "expo-notifications";
import { customDate } from "../interfaces/interfaces";
import { getTask } from "./asyncStorage";

export async function schedulePushNotifications(
  title: string,
  description: string,
  datetime: Date,
  id: string
) {
  let tempNotifications = new Array<string>();

  const timeStamps: customDate[] = [
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
      const notification = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Påminnelse`,
          body:
            time.minutes === 5
              ? `Om ${formatDistance(newDate, datetime, {
                  locale: sv,
                })} ska du "${title}"`
              : description,
          sound: "default",
          data: {
            id: id,
          },
        },
        trigger: {
          date: newDate,
        },
      });

      tempNotifications.push(notification);
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
