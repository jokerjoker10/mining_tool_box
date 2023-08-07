
export interface Notification {
    sendAlarm(deviceName: String, notification_options:NotificationOptions, message?: String): Promise<void>,
    sendOk(deviceName: String, notification_options:NotificationOptions, message?: String): Promise<void>,
    sendTest(notification_options: NotificationOptions): Promise<void>,
}

export class NotificationOptions {

}