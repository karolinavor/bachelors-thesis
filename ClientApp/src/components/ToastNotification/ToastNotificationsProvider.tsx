import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'
import ToastNotificationCard from './ToastNotification'

interface ToastNotificationsProviderSettings {
  customComponent?: React.ReactNode
}

export default function ToastNotificationsProvider(props: PropsWithChildren<ToastNotificationsProviderSettings>) {
  const notificationsState = useSelector((state: RootState) => state.notifications)
  const [state, setState] = useState(notificationsState)

  useEffect(() => {
    setState(notificationsState)
  })

  return (
    <div className='ToastNotificationProvider'>
      <div className='ToastNotificationsWrapper'>
        <div className='ToastNotifications'>
          {state.toastNotifications.map((notification, index) => <ToastNotificationCard key={index} {...notification} />)}
        </div>
      </div>
      {props.children}
    </div>
  )
}