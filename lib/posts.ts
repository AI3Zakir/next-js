import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'pages/md-posts')

export interface MdDataInterface {
  id: string
  title: string
  date: string
  html?: string
}

export async function GetPostDataById(id: string): Promise<MdDataInterface> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return { id: id, title: matterResult.data.title, date: matterResult.data.date, html: contentHtml }
}

export function GetAllPostsId(): string[] {
  return fs.readdirSync(postsDirectory).map((filename) => {
    return filename.replace(/\.md$/, '')
  })
}

export function GetSortedPostsData(): MdDataInterface[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return { id: id, title: matterResult.data.title, date: matterResult.data.date }
  })
  // Sort posts by date
  return allPostsData.sort((a: MdDataInterface, b: MdDataInterface) => {
    if (a.date > b.date) return 1

    return -1
  })
}
