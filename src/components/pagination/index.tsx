import Link from 'next/link'

export const Pagination = ({ numberPages }: { numberPages: number }) => {
  const pages = Math.ceil(numberPages / 3)
  return (
    <h2>
      {Array.from({ length: pages }, (_, i) => (
        <Link key={i + 1} href={i === 0 ? `/community/posts` : `/community/posts/${i + 1}`}>
          {i + 1}
        </Link>
      ))}
    </h2>
  )
}

export default Pagination
