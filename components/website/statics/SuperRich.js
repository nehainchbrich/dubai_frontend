import Image from 'next/image'
import React from 'react'
const SuperRich = () => {
  return (
    <>
    
                <div className='container'>
                    <h4 className='text-center section-title'>SUPER- RICH ARE INVESTING IN DUBAI- HERE IS THE REASON &quot;WHY INVEST IN DUBAI&quot;</h4>
                <div className='row'>
                    <div className='col-md-12 super-rich'>
                        <p>Though the investment is not restricted to a few individuals, it is nevertheless notable that the list of individuals who have contributed to this movement includes the likes of UK-based billionaire Lakshmi Mittal and Chaopeng Zhang, CEO and founder of Binance. Millionaires and Billionaires from around the world are investing in luxury properties in Dubai.</p>
                        <p>Dubai is still a relatively young city compared to other global metropolises, such as London, New York, Los Angeles and Hong Kong. These cities offer some of the highest appreciation in property values--and yet Dubai continues to grow steadily as an international cosmopolitan hub. So, WHY DUBAI?</p>
                        <Image src={`${process.env.API_URL}/common/statics.png`} width={1600} height={900} className='img-fluid'/>
                    </div>
                </div>
                </div>
                <style>
             {`
             .section-title{
              font-size: 25px;
              font-weight: bolder;
              border: 4px solid;
              border-image: var(--two-side-border);
              padding: 10px;
             }
             .super-rich p {
              font-size: 24px;
              margin-top: 25px;
              line-height: 1.5;
          }
          .img-fluid{
            width:100%;
          }
             `}
             </style>
    </>
  )
}

export default SuperRich
