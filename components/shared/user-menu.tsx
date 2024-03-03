import {
  LoginLink,
  LogoutLink,
  RegisterLink
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import defaultUser from '../../public/default_user.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const UserMenu = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex cursor-pointer items-center space-x-3 rounded-full border px-2 py-2 lg:px-4 lg:py-2'>
          <MenuIcon className='size-6 lg:size-5' />
          <Image
            src={user?.picture ?? defaultUser}
            alt='user photo'
            width={32}
            height={32}
            className='hidden rounded-full lg:block'
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        {user ? (
          <>
            <DropdownMenuItem>
              <Link href='/trips' className='block w-full'>
                Trips
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/wishlists' className='block w-full'>
                Wishlists
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form>
                <button type='submit' className='w-full'>
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className='w-full'>Log out</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink className='w-full'>Sign up</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink className='w-full'>Log in</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
