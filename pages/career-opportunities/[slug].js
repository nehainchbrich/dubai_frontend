import React,{ useState, useEffect } from 'react'
import Website from '../../pages/layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import Link from 'next/link';
import { CareerSchema } from '@/schema/CareerSchema';
import LatestProperty from '@/components/website/property/LatestProperty';
import LatestBlog from '@/components/website/blogs/LatestBlog';
import { Form, Formik } from 'formik';
import TextField from '@/form/TextField';
import API_URLS from '@/config/apiconfig';
import TextAreaField from '@/form/TextAreaField';
import {imageKitLoader,formatDate, ImagePath } from '@/helper/Helper';
import Image from 'next/image';
import { fetchData } from '@/config/fetchApi';
const Slug = ({career,meta}) => {
    const defaultValue={fullname:"",email:"",mobile:"",weblink:"",resume:"",jobcode:career[0].code,description:""}
    const description = ImagePath(career[0].description)
      const handleSubmit=async (values,actions)=>{
        const form = document.querySelector('#careerFrm');
        const formData = new FormData(form);
        formData.append('jobcode', career[0].code);
        try {
            const response = await fetch(`${API_URLS.CAREER}`,{
                method: 'POST',
                body: formData,
                contentType: false,
                processData: false,
              });
            const data = await response.json();
           
            if(data.status===true){
                actions.resetForm();
                window.location.href = '/thank-you';
          }
        
        } catch (error) {
          throw Error(error);
        }
      }

  return (
    <>
    <CommonBanner title={career[0].title} meta={meta}/>
    <div className="container my-5">
        <div className="row">
            <div className="col-md-9">
            <div className='row job-card my-3 py-3'>
                <div className='col-md-6'>
                    <h4>{career.title}</h4>
                    <div className='job-details'>
                        <p><span className='fas fa-map-marker'></span> {career[0].address}</p>
                        <p><span className='fas fa-clock'></span> {career[0].jobtype}</p>
                    </div>
                </div>
                <div className='col-md-6 text-end'><Link href="#careerForm" className='btns btn-orange'>Apply Now</Link>
                </div>
            </div>
            <div className='description'>
              <Image loader={imageKitLoader} src={`${career[0].thumbnail}`} alt={`${career[0].title}`} width={100} height={100} style={{width:'100%',height:'auto'}} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} loading='eager' priority={true}/>
                <h4>Job description</h4>
                <div dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
            <hr/>
            <div id='careerForm'>
                <h4>Apply for the job</h4>
                <div className='row'>
                <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={CareerSchema}>
                  <Form className='row' encType="multipart/form-data" id='careerFrm'>
                  <div className='col-md-6'>
                  <TextField type="text" name="fullname" label="Full Name"/>
                  </div>
                  <div className='col-md-6'>
                  <TextField type="text" name="email" label="Email Id"/>
                  </div>
                  <div className='col-md-6'>
                  <TextField type="text" name="mobile" label="Mobile No."/>
                  </div>
                  <div className='col-md-6'>
                  <TextField type="file" name="resume" label="Resume"/>
                  </div>
                  <div className='col-md-12'>
                  <TextField type="text" name="weblink" label="Portfolio Link /Website"/>
                  </div>
                  <div className='col-md-12'>
                    <TextAreaField name="description" label="Cover Letter"/>
                  </div>
                    <div className='mb-3 col-md-4'>
                    <button type="submit" className="btns btn-orange">Apply Now</button>
                    </div>
                  </Form>
                </Formik>
                </div>
                </div>
            </div>
            <div className='col-md-3'>
               <div className='summery-card'>
                <h4>Job Summary</h4>
                <hr/>
                <ul>
                    <li>Published on: {formatDate(career[0].deadline)}</li>
                    <li>Vacancy: {career[0].vacancy}</li>
                    <li>Salary: {career[0].salary}</li>
                    <li>Location: {career[0].address}</li>
                    <li>Job Nature: {career[0].jobtype}</li>
                </ul>
               </div>

               <LatestProperty/>
               <LatestBlog/>
            </div>

             
        </div>
    </div>
    <style>
        {`
          .summery-card {
                padding: 10px;
                border: 2px solid;
                border-image: var(--four-side-border);
            }
            .job-card h4{
                font-weight:bolder;
                text-transform:uppercase;
            }
            .job-card p{
                font-size:16px;
            }
            .job-details{
                display: flex;
                justify-content: space-between;
            }
        `}
        </style>
    </>
  )
}
export default Slug
Slug.getLayout = function getLayout(page) {
    const  {props} = page;
    return <Website meta={props.meta}>{page}</Website>;
  }

export async function getServerSideProps(context) {
  const {slug} =context.query;
    try {
      const career = await fetchData(API_URLS.MANAGE_CAREER,{slug});
      const meta = await fetchData(API_URLS.META,{slug:`career-opportunities/${slug}`,columns: 'title,description,thumbnail,slug'});
      if(career.total > 0){
      return {
        props: {career:career.data,meta:meta.data[0] || null}
      }
     }
     return {
      notFound: true,
    };
      
    } catch (error) {
      return { props: {} };
    }
  }


 