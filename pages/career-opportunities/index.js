import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import LatestProperty from '@/components/website/property/LatestProperty'
import LatestBlog from '@/components/website/blogs/LatestBlog'
import Link from 'next/link'
import API_URLS from '@/config/apiconfig'
import { formatDate } from '@/helper/Helper'
import { fetchData, fetchWebsitePage } from '@/config/fetchApi'
import PreLoader from '@/components/website/common/PreLoader'
const Index = ({ career, careerPage,meta }) => {
    const { data } = career;
    if (data) {
        return (
            <>
                <CommonBanner title={careerPage.title} meta={meta} />
                
                <div className='container job-list my-5'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {careerPage && (
                                <div dangerouslySetInnerHTML={{ __html: careerPage.description }} />
                            )}
                        </div>
                        <div className='col-md-8'>
                            <div className='mx-2'>
                                {data && data.map((item, index) => (
                                    <div className='row job-card shadow-sm my-3 py-3' key={index}>
                                        <div className='col-md-8'>
                                            <h4 className='mb-3'>{item.title}</h4>
                                            <div className='job-details mt-1'>
                                                <p><span className='fas fa-map-marker-alt'></span> {item.address}</p>
                                                <p><span className='fas fa-clock'></span> {item.jobtype}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4 text-end'><Link href={`/career-opportunities/${item.slug}`} className='btns btn-blue mb-2'>Apply Now</Link>
                                            <p className='mb-0'>Dead Line <span className='fas fa-clock'></span> {formatDate(item.deadline)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <LatestProperty />
                            <LatestBlog />
                        </div>
                    </div>
                </div>
                <style>
                    {`
                .job-card{
                    background: #f5f5f5;
                    color: var(--brand-color-1);
                    border-radius: 10px;
                }
                    .fas{
                    color: #817b7b;
                    }
                .job-card h4{
                    font-weight:bolder;
                    text-transform:capitalize;
                    font-size: 1.2rem;
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
    } else { return (<><PreLoader /></>) }
}

export default Index
Index.getLayout = function getLayout(page) {
    const  {props} = page;
    return <Website meta={props.meta}>{page}</Website>;
}
export const getStaticProps = async () => {
    try {
        const options = { status: 1, columns: 'deadline,title,slug,address,jobtype' };
        const career = await fetchData(API_URLS.MANAGE_CAREER, options);
        const careerPage = await fetchWebsitePage('career-opportunities');
        const meta = await fetchData(API_URLS.META,{slug:'career-opportunities',columns: 'title,description,thumbnail,slug'});
        if (career.status === true) {
            return {
                props: { career, careerPage,meta:meta.data[0] },
                revalidate: 43200, // Set ISR and revalidate at midnight every day
            };
        } else {
            return { props: { career: [], careerPage: [] }, revalidate: 10 };
        }

    } catch (error) {
        return { props: { career: [], careerPage: [] }, revalidate: 10 }; // Fallback revalidate time
    }
};