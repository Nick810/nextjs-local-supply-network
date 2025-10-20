import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Story',
  description: 'Stay in the loop with the latest news, releases, and updates from Powerberry and PWBR Records.'
}

export default async function Page() {

  return (
    <main className='container pt-24'>
      <h1 className="text-center text-4xl">Story</h1>

      <div className="grid lg:grid-cols-[40%_60%] gap-8">
        <div className="bg-gray-300 aspect-square"></div>
        <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div className="grid lg:grid-cols-[60%_40%] gap-8 mt-8">
        <div className="bg-gray-300 aspect-square lg:order-2"></div>
        <p className="mt-4 lg:order-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>


      <div className="grid lg:grid-cols-3 gap-2 mt-8">
        <div className="bg-gray-300 aspect-square"></div>
        <div className="bg-gray-300 aspect-square"></div>
        <div className="bg-gray-300 aspect-square"></div>
      </div>
      <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </main>
  )
}
