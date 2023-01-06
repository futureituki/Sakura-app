import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/BreadCrumb/index.module.css'

export const BreadCrumb: NextPage = () => {
  const router = useRouter()

  // pathを「/」で分解
  const paths = decodeURI(router.asPath).substring(1).split('/')

  // リンク先アドレスの取得
  const roots = ['']
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + '/' + paths[i])

  return (
    <div className={styles.container}>
      {/* Homeのリンク */}
      <Link href={'/top'}>
        <span className={styles.link}>Top</span>
      </Link>
      {paths.map((x, i) => (
        <>
          {/* サブページのリンク */}
          {'>'}
          {x === 'top' ? (
            ''
          ) : (
            <Link href={roots[i + 1]} key={i}>
              <span className={styles.link}>{x}</span>
            </Link>
          )}
        </>
      ))}
    </div>
  )
}
