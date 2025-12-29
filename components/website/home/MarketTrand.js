import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {imageKitLoader } from '@/helper/Helper';
const MarketTrand = () => {
  return (
    <>
    <Link href={'/dubai-property-market'}>
        <Image alt='dubai property market' loader={imageKitLoader} src={`/common/DUBAI REAL ESTATE.jpg`} quality={50} sizes='(max-width: 426px) 40vw, 426px' width={100} height={100} style={{width:'100%',height:'auto'}}  className='img-fluid'/>
      </Link>
    </>
  )
}

export default MarketTrand
