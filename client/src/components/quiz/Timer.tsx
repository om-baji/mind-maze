import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const Timer = ({ time,onTimeExpired }: {
    time: number,
    onTimeExpired : () => void;  
}) => {
    const [timeLeft, setTimeLeft] = useState(time)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    if(minutes == 0 && seconds == 0) onTimeExpired();

    return (
        <div className="flex justify-center gap-2">
            <Clock />
            <div className="flex flex-col gap-1">
                <span className="text-black text-xs">Time remaining</span>
                <div>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
            </div>
        </div>
    )
}

export default Timer
