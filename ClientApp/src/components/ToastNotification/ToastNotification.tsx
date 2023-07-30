import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { toastNotificationRemove } from '../../store/reducers/toastNotificationsSlice'

export interface ToastNotificationItem {
  notificationID: number
  title: string
  message?: string
  customDuration?: number | false
}

export default function ToastNotificationCard(props: PropsWithChildren<ToastNotificationItem>) {
  const dispatch: AppDispatch = useDispatch()

  const classList = [`ToastNotification`]

  const title = props.title
  const message = props.message

  const closeHandler = () => {
    dispatch(toastNotificationRemove(props.notificationID))
  }

  const [visible, setVisible] = useState(true)
  const [duration, setDuration] = useState<number | false>(props.customDuration ?? 10000)

  function resetTimer() {
    setDuration(props.customDuration ?? 10000)
  }

  function stopTimer() {
    setDuration(false)
  }

  useEffect(() => {
    if (duration !== false) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  return (
    (visible ? 
      <div className={classList.join(` `)}
        onMouseEnter={() => stopTimer()}
        onMouseLeave={() => resetTimer()}
      >
        { duration ? 
          <div className='ToastNotification-animation' style={{
            animationDuration: duration + `ms`,
            animationIterationCount: 1,
            animationName: `animateToastNotificationBorder`,
            animationTimingFunction: `linear`
          }}></div>
          : null
        }
        { props.customDuration === false ? <div className='ToastNotification-animation'></div> : null }
        <div className='ToastNotification-header'>
          <div className='ToastNotification-title'>
            {title}
          </div>
          <div onClick={() => closeHandler()} className='ToastNotification-close icon-close'></div>
        </div>
        {message ? (
          <div className='ToastNotification-message'>
            {message}
          </div>
        ) : null}
      </div>
    : null)
  )
}