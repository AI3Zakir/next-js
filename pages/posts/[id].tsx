import { GetAllPostsId, GetPostDataById, MdDataInterface } from '../../lib/posts'
import { GetStaticPathsResult, GetStaticPropsResult, NextPage } from 'next'
import Layout from '../components/layout'
import Head from 'next/head'

interface PostProps {
  postProps: MdDataInterface
}

interface Params {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: Params): Promise<GetStaticPropsResult<PostProps>> {
  const postProps = await GetPostDataById(params.id)

  return {
    props: {
      postProps,
    },
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const postIds = GetAllPostsId()

  const paths = postIds.map((postId) => {
    return {
      params: {
        id: postId,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

const Post: NextPage<PostProps> = ({ postProps }: PostProps) => {
  return (
    <Layout>
      <Head>
        <title>{postProps.title}</title>
      </Head>
      <h1>{postProps.title}</h1>
      <h2>{postProps.id}</h2>
      <h3>{postProps.date}</h3>
      {postProps.html ? <div dangerouslySetInnerHTML={{ __html: postProps.html }} /> : null}
    </Layout>
  )
}

export default Post
