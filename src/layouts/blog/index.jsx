import { useState } from 'react'

import { Link } from 'react-router-dom'

import Container from '../../components/container'
import Tab from '../../components/tab'
import Hero from '../../components/hero'
import Background from '../../components/background'
import Loading from '../../components/loader'

import { headBlog } from '../../static/data'

const CategoryLabel = ({ categories }) => (
  <h4 className='absolute top-0 right-0 p-2 text-sm font-medium bg-dark-fade text-light-1 rounded-es-xl'>
    {categories?.map((category, categoryId) => (
      <span className='text-xs font-bold' key={categoryId}>
        {(categoryId ? ', ' : '') + category}
      </span>
    ))}
  </h4>
)

const Card = ({ dataBlogs }) => {
  return (
    <menu className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 place-items-center'>
      {dataBlogs?.map((item, index) => (
        <Link aria-label='navigate' to={`/artikel/${item?.slug}`}>
          <article key={index} className='card'>
            <Background
              isLazy
              isImgFront
              src={item?.images[0]}
              className='w-full overflow-hidden rounded-sm md:max-w-xs min-h-300'
              description={item?.title}
            >
              <CategoryLabel categories={item?.categories} />
            </Background>
            <h3 className='text-lg font-semibold text-primary-1 line-clamp-1'>
              {item?.title}
            </h3>
            <p
              className='mt-2 text-sm line-clamp-4'
              dangerouslySetInnerHTML={{ __html: item.short_description[0] }}
            ></p>
          </article>
        </Link>
      ))}
    </menu>
  )
}

const BlogSection = ({ dataCategories, dataBlogs, blogsLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(dataCategories?.categories?.map(item => item.name))
  ]

  const filteredBlogs =
    dataBlogs?.blogs?.length >= 1 &&
    dataBlogs?.blogs?.filter(item => {
      return item?.categories?.includes(selectedCategory)
    })

  const onCategoryChange = category => {
    setSelectedCategory(category)
  }

  if (blogsLoading) {
    return <Loading height={100} width={100} className='min-h-screen' />
  }

  if (!dataBlogs?.blogs) {
    ;<h3 className='text-2xl font-semibold text-center text-gray-400'>
      Tidak ada artikel untuk saat ini
    </h3>
  }

  return (
    <>
      <Hero
        title={headBlog.title}
        description={headBlog.description}
        image={headBlog.image}
      />

      <Container className='space-y-8'>
        <Tab
          type='secondary'
          currentTab={selectedCategory}
          totalTabs={categories}
          onTabChange={onCategoryChange}
        />
        <Card
          dataBlogs={
            selectedCategory === 'All' ? dataBlogs?.blogs : filteredBlogs
          }
        />
      </Container>
    </>
  )
}

export default BlogSection
