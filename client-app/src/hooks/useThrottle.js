import { useRef } from 'react'

async function useThrottle(action, throttle) {
    const throttleTimer = useRef();

    const handleAction = ({ ...param }) => {
        if (throttleTimer.current) {
            clearTimeout(throttleTimer.current);
        }
        throttleTimer.current = setTimeout(() => {
            action({ ...param })
        }, throttle);
    };

    return handleAction
}

export default useThrottle