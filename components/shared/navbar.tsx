import Image from 'next/image'
import Link from 'next/link'

import desktopLogo from '../../public/airbnb_full.svg'
import mobileLogo from '../../public/airbnb_logo.svg'

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

        <nav className='rounded-full border px-5 py-2'>
          <ul className='flex gap-4'>
            <li>
              <Link href=''>1</Link>
            </li>
            <li>
              <Link href=''>2</Link>
            </li>
            <li>
              <Link href=''>3</Link>
            </li>
          </ul>
        </nav>

        <UserMenu />
      </div>
    </header>
  )
}

export default Navbar
