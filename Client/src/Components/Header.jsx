import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon ,FaSun } from "react-icons/fa"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { toogleTheme } from '../redux/theme/ThemeSlice'
import { signoutSuccess } from '../redux/user/UserSlice'

const Header = () => {
    //for active link
    const path = useLocation().pathname
    const loacation = useLocation()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)
    const [searchTerm, setSearchTerm] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(loacation.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    }, [loacation.search])

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

      const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
      }

  return (
    <Navbar className='border-b-2'>
        <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>Akshit's Blog</span>
        </Link>

        <form onSubmit={handleSubmit}>
            <TextInput 
            type='text'
            placeholder='Search'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 hidden ' color='gray' pill><AiOutlineSearch /></Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10  sm:inline' color='gray' pill onClick={() => dispatch(toogleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
                </Button>
            { currentUser ? (
                <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={"/dashboard/?tab=profile"}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Link>
                </Dropdown>
            ) : (
                <Link to={"sign-in"}><Button gradientDuoTone={'purpleToBlue'} outline>Signin</Button></Link>
            ) }
           
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse >
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/create-post"} as={"div"}> 
                <Link to="/create-post">Create-Post</Link>
                </Navbar.Link>
                <Navbar.Link className='lg:hidden' active={path === "/search"} as={"div"}> 
                <Link to="/search">Search</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
