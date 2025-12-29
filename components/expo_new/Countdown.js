"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/expo_new/Timer.module.css"; // create CSS file
import { calculateTimeRemaining, eventDateExtract, ImagePath } from "@/helper/Helper";

const CountdownTimer = ({data,section}) => {
const [timeRemaining,setTimeRemaining] = useState(calculateTimeRemaining());
const description = ImagePath(section?.sectionSubHeading);
useEffect(()=>{
  if(data[0].eventDate){
    const targetDate =eventDateExtract(data[0].eventDate);
    if(targetDate){
      const timer = setInterval(()=>{
        setTimeRemaining(calculateTimeRemaining(targetDate))
      },1000);
      return ()=>clearInterval(timer);
    }
  }
},[data[0].eventDate]);
  return (
    <div className={styles.timerDiv}>
      <h3 className="text-center">{section?.sectionHeading}</h3>
      <div className="text-center" dangerouslySetInnerHTML={{__html:description}}></div>
      <div className={styles.timeBlocks} role="timer" aria-live="polite">
        <div className={styles.block}>
          <span className={styles.sideText}>DAYS</span>
          <span className={styles.timeText}>{timeRemaining.days}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.sideText}>HOURS</span>
          <span className={styles.timeText}>{timeRemaining.hours}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.sideText}>MINUTES</span>
          <span className={styles.timeText}>{timeRemaining.minutes}</span>
        </div>
        <div className={styles.block}>
          <span className={styles.sideText}>SECONDS</span>
          <span className={styles.timeText}>{timeRemaining.seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
