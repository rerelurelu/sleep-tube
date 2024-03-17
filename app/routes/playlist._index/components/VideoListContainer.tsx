import { FC, PropsWithChildren } from 'react'

export const VideoListContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='border border-indigo-400 place-items-center w-full px-2 py-8 rounded max-w-3xl grid gap-y-10 grid-cols-2 max-h-[650px] overflow-scroll'>
      {children}
    </div>
  )
}
