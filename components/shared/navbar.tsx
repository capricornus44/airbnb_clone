import Image from 'next/image'
import Link from 'next/link'

import desktopLogo from '../../public/airbnb_full.svg'
import mobileLogo from '../../public/airbnb_logo.svg'

import Searchbar from './searchbar'
import UserMenu from './user-menu'

const Navbar = () => {
  return (
    <header className='w-full border-b'>
      <div className='container mx-auto flex items-center justify-between px-5 py-5 lg:px-10'>
        <Link href='/'>
          <Image
            src={desktopLogo}
            alt='airbnb logo'
            priority
            className='hidden w-28 lg:block'
          />
          <Image
            src={mobileLogo}
            alt='airbnb logo'
            priority
            className='block w-8 lg:hidden'
          />
        </Link>

        <Searchbar />

        <UserMenu />
      </div>
    </header>
  )
}

export default Navbar
