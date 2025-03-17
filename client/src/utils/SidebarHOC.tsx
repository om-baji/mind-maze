import Navbar from '@/components/Navbar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const SidebarHOC = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="flex h-screen">
        {/* <SidebarProvider>
          <AppSidebar />
        </SidebarProvider> */}


        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  )
}

export default SidebarHOC
