import React from 'react'
import {StarRating } from '@/helper/Helper';
const ReviewCard = ({item}) => {
  return (
    <>
        <p>{item.name}</p>
        <p>{StarRating(item.rating)}</p>
        <div dangerouslySetInnerHTML={{ __html: `${item.review}` }} />
        <hr/>
    </>
  )
}

export default ReviewCard
