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
  const textBread = (link: string) => {
    switch (link) {
      case 'music-list':
        return '楽曲一覧'
      case 'mypage':
        return 'マイページ'
      case 'change_oshimen':
        return '推しメン選択'
      case 'favorite_change':
        return '推しメン変更'
      case 'member-list':
        return 'メンバー一覧'
      case 'community':
        return 'コミュニティー'
      case 'posts':
        return '投稿一覧'
      case 'tag':
        return 'タグ'
      case 'post':
        return '投稿画面'
      case '0k4rYF9WBoCOoPjr0fEvER':
        return 'As you know?'
      case '0HYpXXxzD45aBgoN84feHc':
        return '流れ弾'
      case '3JRgpVojs3aIgGy835mvLH':
        return '五月雨よ'
      case '74oBBYbpxNZLcwprLNjUFB':
        return 'BAN'
      case '3Hv8KXFlfO3HzhTq9g2yci':
        return "Nobody's fault"
      case '2KHlwYK9HCfnK3b25R6dge':
        return '桜月'
      case 'top?first_come=true':
        return ''
      default:
        return link
    }
  }
  return (
    <div className={styles.container}>
      {/* Homeのリンク */}
      <Link href={'/top'}>
        <span className={styles.link}>Top</span>
      </Link>
      {paths.map((path: string, index: number) => (
        <>
          {/* サブページのリンク */}
          {'>'}
          {path === 'top' ? (
            ''
          ) : (
            <Link href={roots[index + 1]} key={index}>
              <span className={styles.link}>{textBread(path)}</span>
            </Link>
          )}
        </>
      ))}
    </div>
  )
}
