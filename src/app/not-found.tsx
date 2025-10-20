import Link from 'next/link'
 
const NotFound = () => {
  return (
    <main className='container pt-24 flex items-center flex-col'>
      <span className="text-9xl animate-bounce mt-24">🐹</span>
      <h1 className="mt-4 text-8xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">
        Oh snap! You’ve tumbled into the Doodle Dimension…
      </p>
      <p className="mt-4 text-lg text-gray-500">
        Our cartoon hamster hid this page behind a stack of sketchbooks.
      </p>
      <Link href="/" className="btn mt-8 text-center text-gray-500!">
        🏠 Skedaddle Home
      </Link>
    </main>
  )
}

export default NotFound;