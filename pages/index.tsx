import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer'
import Header from '../components/header'
import Select from '../components/select'

const Home: NextPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-stone-100'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='container grow m-auto p-2'>
        <Select />
      </main>
      <Footer />
    </div>
  )
}

export default Home
