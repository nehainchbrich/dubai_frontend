import { ImagePath,imageKitLoader, formatDate } from '@/helper/Helper'
import Image from 'next/image'
import React from 'react'
import CommentFrm from './CommentFrm';

const LeftSide = ({data,comment}) => {
  const postDate = formatDate(data.createdAt);
  const description = ImagePath(data.description,data.title);
  return (
    <>
    <h4>{data.title}</h4>
      <Image loader={imageKitLoader} src={`${data.thumbnail}`} alt={data.title} className="img_fluid" width={500} height={500}/>
        <ul className='basic_info mt-3'>
            <li><i className="fas fa-user"></i> {data.author}</li>
            <li><i className="fas fa-comments"></i> ({comment.length})</li>
            <li><i className="fas fa-eye"></i> ({data.view})</li>
            <li><i className="fas fa-clock"></i> {postDate}</li>
        </ul>
        <p><i className="fas fa-rss"></i> {data.category.map((item, i) => (item.title))}, {data.tags.map((item, i) => (item.title))}</p>
        <div dangerouslySetInnerHTML={{ __html: description }}/>
        <div className='col-md-12 row'>
          <CommentFrm blogCode={data.code} comment={comment}/>
        </div>
        <style>
        {`
        .img_fluid{
          width:100%;
          border:2px solid;
          border-image: var(--four-side-border);
          object-fit: contain;
          height: auto;
        }
        .basic_info {
            display: inline-flex;
            list-style: none;
        }
        .basic_info li {
            margin-right: 10px;
            position: relative;
            left: -30px;
        }
            iframe{
              width:100%;
              min-height:500px;
              height:100%;
            }
        `}
        </style>
    </>
  )
}

export default LeftSide
