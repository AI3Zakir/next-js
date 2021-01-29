// pages/index.tsx
import { GetStaticPropsResult, NextPage } from 'next'
import Layout from './components/layout'
import { MdDataInterface, GetSortedPostsData } from '../lib/posts'
import CybrButton from './components/cybr-button'
import styles from './index.module.sass'

interface PostsProps {
  allPostsData: MdDataInterface[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<PostsProps>> {
  const allPostsData = GetSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const IndexPage: NextPage<PostsProps> = ({ allPostsData }) => {
  return (
    <Layout title={'Index'}>
      <main>
        <h1>Posts:</h1>
        {allPostsData.map((mdData: MdDataInterface) => (
          <li key={mdData.title} className={styles.liPosts}>
            <CybrButton title={mdData.title.substring(0, 15)} link={`/posts/${mdData.id}`} />
          </li>
        ))}
      </main>
    </Layout>
  )
}
export default IndexPage
