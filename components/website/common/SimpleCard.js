import React from 'react'
import styles from '../../../styles/Agent.module.css';
import Link from 'next/link';
const SimpleCard = ({item}) => {
  return (
    <>
     <div className={styles.card}>
    <div className={styles.content}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <p className={styles.btn}><Link href={`/blog-category/${item.slug}`}>Find a Property →</Link></p>
    </div>
    </div>
    </>
  )
}

export default SimpleCard
