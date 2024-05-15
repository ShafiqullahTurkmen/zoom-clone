"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter()

    const { useLocalParticipant } = useCallStateHooks();
    const localParticipants = useLocalParticipant();

    const isMeetingOwner = localParticipants && call?.state?.createdBy && localParticipants.userId === call?.state?.createdBy?.id;

    if (!isMeetingOwner) return null;
    return (
        <Button className='bg-red-500' onClick={async () => {
            call.endCall();
            router.push("/");
        }}>
            End call for every one
        </Button>
    )
}

export default EndCallButton