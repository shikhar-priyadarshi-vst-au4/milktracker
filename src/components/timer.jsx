const Timer = ({milkDuration = {}}) => {
    if(milkDuration)
        return (
            <div className='content-timer'>
                <span>{milkDuration.hours}:</span>
                <span>{milkDuration.minutes}:</span>
                <span>{milkDuration.seconds}</span>
            </div>
        );
    return null;
};

export default Timer;