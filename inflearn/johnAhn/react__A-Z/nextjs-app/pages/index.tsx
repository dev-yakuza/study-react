import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import homeStyles from '@/styles/Home.module.css'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '@/lib/post'

const inter = Inter({ subsets: ['latin'] })

export default function Home({allPostsData}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>LEH</title>
      </Head>

      <section className={homeStyles.headingMd}>
        <p>[LEH Introduction]</p>
        <p>(this is a website)</p>
      </section>

      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {
            allPostsData.map(({id, title, date}) => 
              <li className={homeStyles.listItem} key={id}>
                <Link href={`/posts/${id}`} legacyBehavior>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={homeStyles.lightText}>{date}</small>
              </li>
            )
          }
        </ul>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}