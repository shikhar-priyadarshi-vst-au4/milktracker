import React, { createContext, useRef, useState } from 'react';
import { useEffect } from 'react';

export const MilkContext = createContext();

export const MilkStatusMap = {
    IDLE: 'IDLE',
    STARTED: 'STARTED',
    STOPPED: 'STOPPED',
    PAUSED: 'PAUSED',
}

const audioURLs = [
    "/audio1.mp3",
    "/audio2.mp3",
    "/audio3.mp3", 
    "/audio4.mp3"
]

const MilkProvider = ({ children }) => {
    const [milkHistory, setMilkHistory] = useState([]);
    const [milkStatus, setMilkStatus] = useState(MilkStatusMap.IDLE);
    const [milkTimer, setMilkTime] = useState({
        startTime: null,
        endTime: null
    })

    const [milkDuration, setMilkDuration] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [collectedMilkModal, setCollectedMilkModal] = useState(false);
    const selectedAudio = useRef(null);
    const intervalRef = useRef(null);



    const createMilkId = () => {
        return Math.floor(Math.random() * 1000000);
    }

    const startMilkingTimer = () => {
        intervalRef.current = setInterval(() => {
            if (milkStatus === MilkStatusMap.IDLE || 
                milkStatus === MilkStatusMap.PAUSED) {
                setMilkDuration(previous => {
                    let updatedDuration = { ...previous };
                    if (updatedDuration.seconds < 59) {
                        updatedDuration.seconds++;
                    } else if (updatedDuration.minutes < 59 && updatedDuration.seconds === 59) {
                        updatedDuration.minutes++;
                        updatedDuration.seconds = 0;
                    } else if (updatedDuration.hours < 23 && updatedDuration.minutes === 59 && updatedDuration.seconds === 59) {
                        updatedDuration.hours++;
                        updatedDuration.minutes = 0;
                        updatedDuration.seconds = 0;
                    }
                    return updatedDuration;
                });
            }
        }, 1000);
    };

    const startMilking = () => {
        startMilkingTimer();

        selectedAudio.current = new Audio(audioURLs[Math.floor(Math.random() * audioURLs.length)]);
        setMilkStatus(MilkStatusMap.STARTED);

        if(milkTimer.startTime === null) {
            setMilkTime({
                ...milkTimer,
                startTime: new Date().toLocaleTimeString()
            });
            selectedAudio.current.currentTime = 0;
        }
        selectedAudio.current.play();
        selectedAudio.current.loop = true;
    }

    const resumeMilking = () => {
        startMilkingTimer();
        setMilkStatus(MilkStatusMap.STARTED);
        selectedAudio.current.play();
    }

    const pauseMilking = () => {
        setMilkStatus(MilkStatusMap.PAUSED);
        selectedAudio.current.pause();
        clearInterval(intervalRef.current);
    }

    const stopMilking = () => {
        selectedAudio.current.pause();
        setCollectedMilkModal(true);
        clearInterval(intervalRef.current);
        setMilkTime({
            ...milkTimer,
            endTime: new Date().toLocaleTimeString()
        });
        setMilkStatus(MilkStatusMap.IDLE);
    }

    const addMilk = ({
        milkDate,
        milkStartTime,
        milkEndTime,
        milkTotalDuration,
        milkTotalQuantity,
    }) => {
        const newMilk = {
            id: createMilkId(),
            milkDate,
            milkStartTime,
            milkEndTime,
            milkTotalDuration,
            milkTotalQuantity,
        };
        const getMilkHistory = JSON.parse(localStorage.getItem('milkHistory')) || [];
        getMilkHistory.push(newMilk);
        localStorage.setItem('milkHistory', JSON.stringify(getMilkHistory));
        setMilkHistory((previous) => ([
            ...previous,
            newMilk
        ]));
    };

    const onCollectedModal = (milkTotalQuantity) => {
        addMilk({
            milkDate: new Date().toLocaleDateString(),
            milkStartTime: milkTimer.startTime,
            milkEndTime: milkTimer.endTime,
            milkTotalDuration: `${milkDuration.hours} hours, ${milkDuration.minutes} minutes, ${milkDuration.seconds} seconds`,
            milkTotalQuantity
        });
        setCollectedMilkModal(false);
        setMilkDuration((previous) => ({
            ...previous,
            hours: 0,
            minutes: 0,
            seconds: 0
        }))
    }

    const fetchMilkHistory = () => {
        const getMilkHistory = JSON.parse(localStorage.getItem('milkHistory')) || [];
        setMilkHistory(getMilkHistory);
    }

    useEffect(() => {
        fetchMilkHistory();
    }, []);

    return (
        <MilkContext.Provider value={{ 
                milkHistory, 
                milkDuration,
                milkStatus,
                startMilking, 
                stopMilking, 
                pauseMilking,
                resumeMilking,
                collectedMilkModal,
                onCollectedModal }}>
            {children}
        </MilkContext.Provider>
    );
};

const MilkConsumer = ({ children }) => {
    return (
        <MilkContext.Consumer>
            {(value) => {
                return React.Children.map(children, (child) => {
                    return React.cloneElement(child, { ...value });
                });
            }}
        </MilkContext.Consumer>
    );
};

export { MilkProvider, MilkConsumer };