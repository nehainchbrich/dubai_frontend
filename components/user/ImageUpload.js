import React, { useState } from 'react';
import styles from '../../styles/user/Document.module.css'
import { useAuth } from '@/helper/Auth';
import API_URLS from '@/config/apiconfig';
import { useRouter } from 'next/router';
const ImageUpload = () => {
  const {user} = useAuth();
  const router = useRouter();
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleDrop = (event) => {
      event.preventDefault();
      handleFileUpload(event.dataTransfer.files[0]);
    };
  
    const handleFileUpload = (file) => {
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => prevProgress + 10);
      }, 500);
  
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        uploadToApi(file);
      }, 3000);
    };
  
    const uploadToApi = async (file) => {
      try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('userCode', user.userCode); // Replace 'yourUserCodeHere' with the actual userCode
        
        const response = await fetch(API_URLS.DOCUMENTS, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        setUploadProgress(0);
        toastr.success('File uploaded successfully');
        setTimeout(() => { router.reload();}, 5000);
        
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  return (
    <>
      <div className='container my-5'>
        <div className='row'>
            <div className='col-md-8 m-auto text-center'>
                <p>{`Upload required documents to secure your dream property in Dubai. This ensures a smooth transaction - simply drag & drop your files or click "Browse Files" below. Let's get you settled!`}</p>
            </div>
            <div className={`col-md-8 m-auto ${styles.uploadImg}`} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => document.getElementById('fileInput').click()}>
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e.target.files[0])} />
            
            {uploadProgress < 100 ? (
              <>
                <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
                <i className="fa-solid fa-upload mb-3"></i>
                <h4>Drag & Drop or Click to Upload Image</h4>
              </>
            ) : (
              <h4>Upload Completed!</h4>
            )}
           
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageUpload
