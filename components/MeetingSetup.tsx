"use client"
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupCompleted}: {setIsSetupCompleted: (value: boolean) => void}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);
  return (
    <div className='flex-center h-screen w-full flex-col'>
      <h1 className='text-2xl font-bold text-white'>Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3 text-white">
        <label htmlFor="isMicCamToggleOn" className='flex items-center justify-center gap-2 font-medium'>
          <input type="checkbox" id="isMicCamToggleOn" checked={isMicCamToggleOn} onChange={e => setIsMicCamToggleOn(e?.target?.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
        call?.join();
        setIsSetupCompleted(true);
      }}>
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup