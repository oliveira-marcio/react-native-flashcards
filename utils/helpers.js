import React from 'react'
import { AsyncStorage, Platform } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { APP_NAME, NOTIFICATION_TITLE, NOTIFICATION_BODY } from './constants'

const NOTIFICATION_KEY = 'flashcads:notifications'
const NOTIFICATION_CHANNEL_ID = 'flashcads'

export const plural = (quantity, text) => {
  return `${quantity} ${text}${quantity !== 1 ? 's' : ''}`
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
    ios: {
      sound: true,
    },
    android: {
      channelId: NOTIFICATION_CHANNEL_ID,
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

/**
 * Agenda uma notificação para as 12:00 do dia seguinte
 */
export function setLocalNotification () {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync(NOTIFICATION_CHANNEL_ID, {
        name: APP_NAME,
      })
  }

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(12)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
