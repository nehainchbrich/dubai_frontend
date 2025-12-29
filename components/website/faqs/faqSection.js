import { useState } from 'react';
import styles from '../../../styles/Faqs.module.css';
import { ImagePath } from '@/helper/Helper';
const FaqSection = ({title,content,count}) => {
    const [isOpen, setIsOpen] = useState(false);
        const handleToggle = () => {
      setIsOpen(!isOpen);
    };
    const description = ImagePath(content,title);
  return (
    <>
      <div className={`${styles.accordion_item} ${isOpen && styles.active}`}>
        <div className={`${styles.accordion_header} shadow-sm mb-2`} onClick={handleToggle}>
          <h3><b>Q.{count+1}.</b> {title}</h3>
          <button className={styles.accordion_toggle}></button>
        </div>
        {isOpen &&<div className={styles.accordion_content}>
          <div dangerouslySetInnerHTML={{ __html: description }}/>
        </div>}
        </div>
    </>
  )
}

export default FaqSection
