import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashPosts = () => {
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [postIdToDelte, setPostIdToDelte] = useState('')
    
    const { currentUser } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchPosts = async() => {
            try{
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if(res.ok){
                    setUserPosts(data.posts)
                    if(data.length <9){
                        setShowMore(false)
                    }
                }
            }
            catch(err){

            }
        }
        fetchPosts()
    }, [currentUser._id])
    console.log(userPosts)

    const handleShowMore = async() => {
        const startIndex = userPosts.length
        try{
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()

            if(res.ok){
                setUserPosts((prev) => [...prev, ...data.posts])
                if(data.posts.length < 9){
                    setShowMore(false)
                }
            }
        }
        catch(err){
            console.error(err)
        }
    }

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
          const res = await fetch(`/api/post/deletepost/${postIdToDelte}/${currentUser._id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            setUserPosts((prev) => {
              return prev.filter((post) => post._id !== postIdToDelte);
            });
          }
        } catch (err) {
          console.error(err);
        }
      };
      

  return (
    <div className='tabel-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser && userPosts.length > 0 ? (
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell> <span>Edit</span> </Table.HeadCell>
        </Table.Head>
{userPosts.map((post) => (
    <Table.Body className='divide-y'>
        <Table.Row className='bg-white darl:border-gray-700 dark:bg-gray-800'>
            <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell>
                <Link to={`/post/${post.slug}`}>
                    <img 
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                    />
                </Link>
            </Table.Cell>
            <Table.Cell>
                <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
            </Table.Cell>
            <Table.Cell>{post.category}</Table.Cell>
            <Table.Cell>
                <span onClick={() => {
                    setShowModal(true)
                    setPostIdToDelte(post._id)
                }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
            </Table.Cell>
            <Table.Cell>
                <Link className='text-teal-500' to={`/update-post/${post._id}`}>
                <span>Edit</span>
                </Link>
            </Table.Cell>
        </Table.Row>
    </Table.Body>
))}
        
      </Table>
      {showMore && (
        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
      )}
      </>)
       :
       (<p>You have no posts</p>)}
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure yo want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I am sure
              </Button>
              <Button color="gray">No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPosts
