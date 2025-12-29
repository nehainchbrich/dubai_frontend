import React from 'react'
import styles from '../../../styles/WhyInchBrick.module.css';
const WhyInchBrick = ({heading}) => {
    const items = [
        {
          icons:"fas fa-clipboard-list",
          title: "Proven Experience",
          description:"We are a team of passionate individuals with over 10 years of experience in Dubai real estate. We use our expertise in finding you your dream property."
        },
        {
            icons:"fas fa-phone-volume",
            title: "Here for you",
            description:"We are here for you 24*7 to assist you in all your real estate adventures. We promise to be as accessible as possible."
          },
          {
            icons:"fas fa-users",
            title: "Talented Consultants",
            description:"We have a team of talented professionals who are passionate about providing you the best real estate experience. Here at Inchbrick, we focus on providing the best service and a smooth real estate journey."
          },
          {
            icons:"fas fa-map-marked-alt",
            title: "Local International",
            description:"Our team provides you with best real estate assistance and has unrivalled knowledge about not just Dubai but international real estate markets like U.K., Australia, Canada and Hong kong, ensuring to provide you your dream property."
          },
          {
            icons:"fas fa-building",
            title: "The biggest choice of properties",
            description:"Our property advisors have several years of real estate experience and focus on providing you with the best properties according to your requirements. We ensure to provide our clients with the largest choice of properties in the market."
          },
          {
            icons:"fas fa-house",
            title: "Full-Service solution",
            description:"We are your one stop solution for all your property needs. We provide you with relevant information pertinent to real-estate activities, assisting prospective buyers to make informed decisions and make online property search more quicker and convenient."
          }
      ];
  return (
    <>
      <div className='container my-5'>
      <div dangerouslySetInnerHTML={{ __html: heading }} />
        <div className='row my-5'>
        {items.map((item, index) => (
           <div className='col-md-4 mb-3' key={index}>
           <div className={styles.card}>
            <i className={item.icons}/>
               <div className={styles.card_content}>
                   <h3 className={styles.card_title}>{item.title}</h3>
                   <div className={styles.card_text} dangerouslySetInnerHTML={{ __html: `${item.description}` }}/>
                </div>
               </div>
           </div>
            ))}
        </div>
      </div>
     </>
  )
}

export default WhyInchBrick
