import { useContext, useState } from 'react';
import './App.css';
import cowMilk from "./assets/cowMilk.jpg";
import Button from './components/button';
import Timer from './components/timer';
import { MilkContext, MilkStatusMap } from './store/milkStore';
import Dialog from './components/dialog';
import Table from './components/table';

function App() {
  const [showMilkHistoru, setShowMilkHistory] = useState(false);
  const {
    milkHistory,
    milkDuration,
    milkStatus,
    startMilking, 
    stopMilking, 
    pauseMilking,
    resumeMilking,
    collectedMilkModal,
    onCollectedModal 
  } = useContext(MilkContext);
  return (
    
      <div className="milkApp">
        <header className="milkApp-header">
          <div className="header-brand">
            <img 
              src={cowMilk} 
              alt='milk tracker' 
              width={80} 
              height={80}
              loading='lazy'/>
            <h1>Milk Tracker</h1>
          </div>
          <button className="milk-button" onClick={() => setShowMilkHistory(true)}>
            Milking History
          </button>
        </header>
        <section className='milkApp-content'>
                  <Timer milkDuration={milkDuration}/>
                  {milkStatus == MilkStatusMap.IDLE && 
                  <Button text='Start' onClick={startMilking} />}
                  {milkStatus == MilkStatusMap.STARTED &&
                  <Button text='Pause' onClick={pauseMilking} />}
                  {milkStatus == MilkStatusMap.PAUSED &&
                  <Button text='Resume' onClick={resumeMilking} />}
                  {milkStatus != MilkStatusMap.IDLE &&
                  <Button text='Stop' onClick={stopMilking} />}
        </section>
        {showMilkHistoru && <Table tableData={milkHistory}/>}
        {collectedMilkModal && <Dialog onSaveHandler={onCollectedModal}/> }
      </div>
   
  )
}

export default App
