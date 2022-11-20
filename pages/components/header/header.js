import Head from 'next/head'

export default function Header() {
  return (
    <>
      <Head>
        <title>To Do App</title>
        <meta name="description" content="to do app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
    </>
  )
}