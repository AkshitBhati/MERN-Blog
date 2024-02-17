import React, { useState } from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill"
import { storage } from "../Config"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [file, setFile] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})

  const handleUploadImage = async() => {
    try{
      if(!file){
        setImageUploadError('Please select an image')
        return
      }
      setImageUploadError(null)
      const fileName = new Date().getTime() + '-' + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageUploadError('Image upload failed')
          setImageUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProgress(null)
            setImageUploadError(null)
            setFormData({...formData, image:downloadUrl})
          })
        }
      )  
    }
    catch(err){
      setImageUploadError('Image Uplaod Failed')
      setImageUploadProgress(null)
    }
  } 
  
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
    <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput placeholder='Title' type='text' required id='title' className='flex-1'/> 
            <Select>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">React JS</option>
                <option value="nextjs">Next JS</option>
            </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
            <Button type='button' gradientDuoTone="purpleToBlue" size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
              {imageUploadProgress === true ? 
              (<div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress }% `} />
              </div>) : 
              'Upload Image'
              }
              </Button>
        </div>
              {imageUploadError && (
                <Alert color='failure'>{imageUploadError}</Alert>)}
                {formData.image && (
                  <img 
                  src={formData.image}
                  alt='Upload'
                  className='w-full h-72 object-cover'
                  />
                )}
              
        <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mb-12' required/>
        <Button type='submit' gradientDuoTone={'purpleToPink'}>Publish</Button>
    </form>
    </div>
  )
}

export default CreatePost
