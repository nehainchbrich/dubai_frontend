import User from '@/pages/layouts/user'
import styles from '../../../styles/user/Profile.module.css'
import WelcomeBar from '@/components/user/WelcomeBar'
import { Form, Formik } from 'formik'
import TextField from '@/form/TextField'
import { useAuth } from '@/helper/Auth'
import { ResetPassSchema } from '@/schema/ResetPassSchema'
import API_URLS from '@/config/apiconfig'
import { UpdateUserSchema } from '@/schema/UpdateUserSchema'
const Index = () => {
  const {user, handleLogout} = useAuth();
  const passDefault={password:"", cpassword:""}
  const detailsDefault={fullName:user.fullName, email:user.email,mobile:user.mobile}
  const handlePassSubmit=async (value,action)=>{
    const email = user.email;
    try {
      const response = await fetch(`${API_URLS.PASS_RESET}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({password:value.password,email:email})
    })
    const res= await response.json()
    if(res.status===true){
      action.resetForm();
      toastr.success(res.message);
      handleLogout();
    }else{
        toastr.error(res.message);
    }
    } catch (error) {
      throw Error(error);
    }
  }
  const handleSubmit=async (value,action)=>{
    try {
      const response = await fetch(`${API_URLS.REGISTER_USER_SLUG(user.userCode)}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({fullName:value.fullName,email:value.email,mobile:value.mobile})
    })
    const res= await response.json()
    if(res.status===true){
      action.resetForm();
      toastr.success(res.message);
      handleLogout();
    }else{
        toastr.error(res.message);
    }
    } catch (error) {
      throw Error(error);
    }
  }
  return (
    <>
    <WelcomeBar/>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <div className={styles.userDetailsCard}>
            <h4 className='text-dark'>Update Your Profile Details</h4>
              <Formik initialValues={detailsDefault} onSubmit={handleSubmit} validationSchema={UpdateUserSchema}>
                <Form className={styles.detailfrm}>
                  <TextField type="text" name="fullName" label="Full Name"/>
                  <TextField type="email" name="email" label="Email ID"/>
                  <TextField type="text" name="mobile" id="smobile" label="Mobile"/>
                  <div className='mb-2'>
                    <button type="submit" className='btns btn-blue btn-100'>Update</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className='col-md-6 mb-3'>
            <div className={styles.userDetailsCard}>
            <h4 className='text-dark'>Change Your Password</h4>
              <Formik initialValues={passDefault} onSubmit={handlePassSubmit} validationSchema={ResetPassSchema}>
                <Form className={styles.detailfrm}>
                  <TextField type="password" name="password" label="Password"/>
                  <TextField type="password" name="cpassword" label="Conform Password"/>
                  <div className='mb-2'>
                    <button type="submit" className='btns btn-blue btn-100'>Change Password</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
    return (<User>{page}</User>)
  }