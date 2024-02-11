import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../Config";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateFailure, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess } from "../redux/user/UserSlice"
import { HiOutlineExclamationCircle } from "react-icons/hi"

const DashboardProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUplaodingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  //ref for images
  const filePickerRef = useRef()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageFileUploadError(null);
    }
    setImage(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No changes made')
      return 
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload')
      return
    }
    try{
      dispatch(updateStart())
      const res = await fetch(`/api/update/${currentUser._id}`, {
        method:"PUT",
        headers:{
          'Content-Type':"Application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }
      else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess('Users profile updated successfully')
      }
    }
    catch(err){
      dispatch(updateFailure(err.message))
      setUpdateUserError(err.message)
    }
  }

  useEffect(() => {
    if(image){
      uploadImage()
    }
  }, [image])

   const uploadImage = async() => {
    setImageFileUploading(true) 
    setImageFileUploadError(null)
     
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uplaodTask = uploadBytesResumable(storageRef, image)
    
    uplaodTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadingProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)')
        setImageFileUploadingProgress(null)
        setImage(null)
        setImageFileUrl(null)
        setImageFileUploading(null)
      },
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl)
          setFormData({ ...formData, profilePicture:downloadUrl })
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleDelete = async() =>{
    setShowModal(false)
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`api/delete/${currentUser._id}`, {
        method:"DELETE",
      })
      const data = res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess(data))
    }
    catch(err){
      dispatch(deleteUserFailure(err.message))
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/signout', {
        method: "POST",
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.log("Error response:", res.status, data);
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
          {imageFileUplaodingProgress && (
            <CircularProgressbar value={imageFileUplaodingProgress || 0} text={`${imageFileUplaodingProgress}`} strokeWidth={5} styles={{root:{
              width:"100%",
              height:"100%",
              position:"absolute",
              top:0,
              left:0,

            },
          path:{
            stroke:`rgba(62, 152, 199, ${imageFileUplaodingProgress / 100})`
          }}}/>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] ${imageFileUplaodingProgress && imageFileUplaodingProgress < 100 && 'opacity-60'}`}
          />
        </div>
        
          {imageFileUploadError && <Alert color={"failure"}>{imageFileUploadError}</Alert>}
        
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput 
        type="password" 
        id="password" 
        placeholder="Password" 
        onChange={handleChange}/>

        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure yo want to delete your account?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>Yes, I am sure</Button>
              <Button color="gray">No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashboardProfile;
