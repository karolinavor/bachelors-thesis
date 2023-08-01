import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import ToastNotificationCard from './ToastNotification'

interface ToastNotificationsProvIDerSettings {
  customComponent?: React.ReactNode
}

export default function ToastNotificationsProvIDer(props: PropsWithChildren<ToastNotificationsProvIDerSettings>) {
  const toastNotificationsState = useSelector((state: RootState) => state.toastNotifications)

  return (
    <div className='ToastNotificationProvIDer'>
      <div className='ToastNotificationsWrapper'>
        <div className='ToastNotifications'>
          {toastNotificationsState?.toastNotifications.map((notification, index) => <ToastNotificationCard key={index} {...notification} />)}
        </div>
      </div>
      {props.children}
    </div>
  )
}