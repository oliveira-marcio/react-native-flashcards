import React from 'react'
import { AsyncStorage, Platform } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { APP_NAME, NOTIFICATION_TITLE, NOTIFICATION_BODY } from './constants'

const NOTIFICATION_KEY = 'flashcads:notifications'
const NOTIFICATION_CHANNEL_ID = 'flashcads'

export const plural = (quantity, text) => {
  return `${quantity} ${text}${quantity !== 1 ? 's' : ''}`
}

export const formatPercent = (value) => `${parseFloat(100 * value).toFixed(2)}%`

//TODO: Adicionar horas, minutos e segundos
export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ))
  return todayUTC.toISOString()
  //.split('T')[0]
}

export function formatDate(ISOString){
  const b = ISOString.split(/\D+/);
  //const date  = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
//  return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString()}`
  return `${b[2]}/${b[1]}/${b[0]} ${b[3]}:${b[4]}:${b[5]}`
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
