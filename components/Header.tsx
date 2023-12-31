'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Avatar from 'react-avatar'
import Searchbar from './search/Searchbar'
import { IoNotificationsOutline } from 'react-icons/io5'
import { useBoardStore } from '@/store/BoardStore'
import { signOut } from 'next-auth/react'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import useCurrentUser from '@/hooks/useCurrentUser'
import Button from './Button'
import { MdOutlineLogout } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined

type Props = {
  user: User,
}

// Top header component searchbar/user menu
function Header({ user }: Props) {
  console.log('session user from header: ', user)

  // get current user from db
  const router = useRouter()
  const { data: currentuser } = useCurrentUser()

  const [board] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ])

  //local state
  const [userMenu, showUserMenu] = useState(false)
  const [logo, setLogo] = useState('/images/logostatic.gif')

  const hideInput = () => showUserMenu(false)

  const ref = useDetectClickOutside({ onTriggered: hideInput });

  return (
    <header>
      <div className="topheader rounder-b-2xl">
        <div
          onClick={() => router.push('/board')}
          onMouseEnter={() => setLogo('/images/logoanimated.gif')}
          onMouseLeave={() => setLogo('/images/logostatic.gif')}
          className="cursor-pointer">
          <Image
            src={logo}
            alt="Trello AI Clone"
            width={100}
            height={100}
            className="w-10 md:w-20 pb-10 md:pb-0 object-contain"
          />
        </div>

        <div className="topheader_user">
          {
            user && currentuser &&
            <>
              <div className="flex flex-col items-end z-10" ref={ref}>
                <div className="w-full flex flex-row items-center gap-2">
                  <div>
                    <Searchbar />
                  </div>
                  <IoNotificationsOutline
                    onClick={() => { }}
                    className="cursor-pointer text-slate-200"
                    size="20"
                    name='notifications'
                  />
                  <Avatar
                    onClick={() => showUserMenu(!userMenu)}
                    className="cursor-pointer"
                    name={user?.name!}
                    size="30"
                    round={true}
                  />
                </div>
                {
                  userMenu && (
                    <div className="topheader_user_menu">
                      <div className="mb-2 p-2">Account</div>
                      <hr />
                      <div className="flex flex-col items-center mt-2 mb-2">
                        <div className="flex items-center">
                          <Avatar className="cursor-pointer mr-2" name={user?.name!} size="40" round={true} />
                          <div className="flex flex-col mb-2 w-[140px]">
                            <p className="truncate whitespace-nowrap text-md">{user?.name!}</p>
                            <p className="truncate whitespace-nowrap text-sm">{user?.email!}</p>
                          </div>
                        </div>
                        <div className="flex flex-col w-full p-2">
                          <Link
                            className='flex flex-1 w-full'
                            href={`/profile/${currentuser._id}`}>
                              <Button
                                label="Profile"
                                outline
                                icon={CgProfile}
                              />

                          </Link>
                          <Button
                            label="Logout"
                            outline
                            onClick={() => signOut({ callbackUrl: '/' })}
                            icon={MdOutlineLogout}
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
