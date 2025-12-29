import { useState } from "react";
import styles from '../../../styles/FilterSection.module.css';

const FilterSection = ({category,amenities,ptype,developer,handleFilterChange,agents,address}) => {
  const [activeItems, setActiveItems] = useState([0,1,2,3,4,5]);
  const toggleAccordion = (index) => {
    if (activeItems.includes(index)) {
      setActiveItems(activeItems.filter((item) => item !== index));
    } else {
      setActiveItems([...activeItems, index]);
    }
  };
  return (
    <>
      <div className={`${styles.accordion} my-4`}>
      <div className={`${styles.accordion_item} ${activeItems.includes(0) ? styles.active : ""}`}>
        <div className={styles.accordion_header} onClick={() => toggleAccordion(0)}>
          <h4>Type of Property</h4>
          <button className={styles.accordion_toggle}></button>
        </div>
        <div className={styles.accordion_content}>
        {ptype && ptype.map((item,index)=>(
          <div className={styles.form_check} key={index}>
              <input className={styles.form_check_input} type="checkbox" name='pTypeName' id={item.toLowerCase().replace(/\s+/g, '-')} value={item} onChange={handleFilterChange}/>
              <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}> {item} </label>
          </div>
        ))}
        </div>
        </div>
        <div className={`${styles.accordion_item} ${activeItems.includes(1) ? styles.active : ""}`}>
        <div className={styles.accordion_header} onClick={() => toggleAccordion(1)}>
          <h4>Agents</h4>
          <button className={styles.accordion_toggle}></button>
        </div>
        <div className={styles.accordion_content}>
        {agents && agents.map((item,index)=>(
          <div className={styles.form_check} key={index}>
              <input className={styles.form_check_input} type="checkbox" name='agentName' id={item.toLowerCase().replace(/\s+/g, '-')} value={item} onChange={handleFilterChange}/>
              <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}> {item} </label>
          </div>
        ))}

        </div>
        </div>

        <div className={`${styles.accordion_item} ${activeItems.includes(2) ? styles.active : ""}`}>
        <div className={styles.accordion_header} onClick={() => toggleAccordion(2)}>
          <h4>Locations</h4>
          <button className={styles.accordion_toggle}></button>
        </div>
        <div className={styles.accordion_content}>
        {address && address.map((item,index)=>(
          <div className={styles.form_check} key={index}>
              <input className={styles.form_check_input} type="checkbox" name='address' id={item.toLowerCase().replace(/\s+/g, '-')} value={item} onChange={handleFilterChange}/>
              <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}> {item} </label>
          </div>
        ))}
        </div>
        </div>

        <div className={`${styles.accordion_item} ${activeItems.includes(3) ? styles.active : ""}`}>
        <div className={styles.accordion_header} onClick={() => toggleAccordion(3)}>
          <h4>Amenities</h4>
          <button className={styles.accordion_toggle}></button>
        </div>
        <div className={styles.accordion_content}>
          {amenities && amenities.map((item,index)=>(
            <div className={styles.form_check} key={index}>
              <input className={styles.form_check_input} type="checkbox" name='amenities' id={item.toLowerCase().replace(/\s+/g, '-')} value={item} onChange={handleFilterChange}/>
              <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}> {item} </label>
          </div>
          ))}
        </div>
        </div>

        {category && category.length > 0 && (
        <div className={`${styles.accordion_item} ${activeItems.includes(4) ? styles.active : ""}`}>
          <div className={styles.accordion_header} onClick={() => toggleAccordion(4)}>
            <h4>Category</h4>
            <button className={styles.accordion_toggle}></button>
          </div>
          <div className={styles.accordion_content}>
            {category.map((item, index) => (
              <div className={styles.form_check} key={index}>
                <input
                  className={styles.form_check_input}
                  type="checkbox"
                  name='categoryName'
                  id={item.toLowerCase().replace(/\s+/g, '-')}
                  value={item}
                  onChange={handleFilterChange}
                />
                <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


        <div className={`${styles.accordion_item} ${activeItems.includes(5) ? styles.active : ""}`}>
        <div className={styles.accordion_header} onClick={() => toggleAccordion(5)}>
          <h4>Developer</h4>
          <button className={styles.accordion_toggle}></button>

        </div>
        <div className={styles.accordion_content}>
          {developer && developer.map((item,index)=>(
            <div className={styles.form_check} key={index}>
              <input className={styles.form_check_input} type="checkbox" name='developerName' id={item.toLowerCase().replace(/\s+/g, '-')} value={item} onChange={handleFilterChange}/>
              <label className={styles.form_check_label} htmlFor={item.toLowerCase().replace(/\s+/g, '-')}> {item} </label>
          </div>
          ))}
        </div>
        </div>
    </div>
    </>
  );
};

export default FilterSection;
