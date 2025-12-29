import API_URLS from '@/config/apiconfig';
import { useAuth } from '@/helper/Auth';
import { imageKitLoader } from '@/helper/Helper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Documents = () => {
  const {user} = useAuth()
  const [doc, setdoc] = useState([]);
  const fetchData =async ()=>{
      const res = await fetch(`${API_URLS.DOCUMENTS}?userCode=${user.userCode}`);
      const docData = await res.json();
      setdoc(docData.data);
  }
  useEffect(()=>{
    fetchData();
  },['']);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(API_URLS.DOCUMENTS_SLUG(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        toastr.success('File Deleted successfully');
        fetchData();// Reload the page after deletion
      } else {
        // Handle deletion error
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  return (
    <>
     <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
            <div className="table-responsive">
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">File</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {doc && doc.map((item,i)=>(
                  <tr key={i}>
                  <td><Image loader={imageKitLoader} src={item.document} width={100} height={100} alt={item.name} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} loading='eager' priority={true}/></td>
                  <td>{item.name}</td>
                  <td><a href={`${process.env.API_URL}${item.document}`} download={true} target='_blank'><i className="fa-solid fa-download icons"></i> </a>
                  {item.uploadedBy === 'USER' && item.status === "0" && (
                    <>
                      / <i className="fa-solid fa-trash icons" onClick={() => handleDelete(item.id)}></i>
                    </>
                  )}
                  </td>
                </tr>
                ))}
                
              </tbody>
              </table>
            </div>
            </div>
        </div>
     </div>
     <style jsx>
      {`
        .icons{
          color:var(--brand-color-2);
          font-size:18px;
          cursor:pointer;
        }
      `}
     </style>
    </>
  )
}

export default Documents
