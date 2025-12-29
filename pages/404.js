import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const CustomError = () => {
  return (
    <>
    <div className="container">
		<h1>404 Error</h1>
    <Image src={`${process.env.API_URL}/common/error.svg`} alt="404 Error" width={1200} height={400}/>
		<p>{`Oops! The page you're looking for cannot be found.`}</p>
		<div className='error_btn'>
      <Link href="/" className='link'>Go Back →</Link>
      <Link href="/contact" className='link'>Contact →</Link>
    </div>
	</div>
  <style jsx>
		{`
    body {
			font-family: Arial, sans-serif;
			background-color: #f5f5f5;
		}

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 50px;
		}

		h1 {
			font-size: 4rem;
			margin-bottom: 20px;
			color: #444;
      text-align: center;
		}

		img {
			max-width: 100%;
			margin-bottom: 50px;
      height:50vh;
      width:100%
		}

		p {
			font-size: 1.5rem;
			color: #666;
			margin-bottom: 30px;
      text-align: center;
		}
    a{
      color: #fff;
      text-decoration: none;
      padding: 10px;
      background: #25408f;
      margin: 10px;
      border-radius: 25px;
      width: 120px;
      text-align: center;
      text-transform: uppercase;
    }
	.error_btn{
    display: flex;
    justify-content: center;
    width:100%;
  }
    `}
  </style>
    </>
  )
}

export default CustomError
