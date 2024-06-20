import WebcamProvider from '@/components/WebcamProvider'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const FeedbackLayout = ({ children }: Props) => {
  return (
    <WebcamProvider>
        {children}
    </WebcamProvider>
  )
}

export default FeedbackLayout