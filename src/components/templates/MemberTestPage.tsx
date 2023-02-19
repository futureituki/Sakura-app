import { css } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { PrimaryButton } from '@/components/atoms/Button'
import { SelectModal } from '@/components/modal/selectModal'
import { QuestionAnswer } from '@/constant/question'
import { db } from '@/firebase/firebase'
import { useGetUser } from '@/lib/user'
import { setImages } from '@/redux/imageSlice'
import { userSaveBookmark } from '@/redux/userSlice'
import styles from '@/styles/Favorite.module.css'
import { UserReducer } from '@/types/user'

type Answer = {
  name: string
  type: string[]
  src: string
}
type SelectedProps = {
  name: string
  src: string
}
type Props = {
  id: string
  first_favorite: {
    name: string
    src: string
  }
}
export const MemberTestPage = () => {
  const dispatch = useDispatch<any>()
  const router = useRouter()
  const user: UserReducer = useGetUser().user
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImg, setSelectedImg] = useState<SelectedProps>({ name: '', src: '' })
  const [questionAnswers, setQuestionAnswers] = useState<Array<string>>([])
  const [questionNumber, setQuestionNumber] = useState<number>(1)
  const [question, setQuestion] = useState<string[]>([])
  const [answer, setAnswer] = useState<Answer[]>([])
  const [displayAnswer, setDisplayAnswer] = useState<Answer[]>([])
  const TARGET_COLLECTION_NAME = 'questions'
  const COLORS = ['orange', 'pink', 'green', 'blue']

  // interest, mystery, cute, cool , expression の数で判定//
  const getQuestion = async (num: number) => {
    const docRef = doc(db, TARGET_COLLECTION_NAME, `${num}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const texts = Object.values(docSnap.data())
      setQuestion(texts)
      for (let i = question.length - 1; 0 < i; i--) {
        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1))

        // 要素の並び替えを実行
        let tmp = texts[i]
        texts[i] = texts[r]
        texts[r] = tmp
      }
    } else {
      const mysteryCount = questionAnswers.filter((answer: string) => answer === 'mystery').length
      const coolCount = questionAnswers.filter((answer: string) => answer === 'cool').length
      const cuteCount = questionAnswers.filter((answer: string) => answer === 'cute').length
      const expressionCount = questionAnswers.filter(
        (answer: string) => answer === 'expression',
      ).length
      const interestCount = questionAnswers.filter((answer: string) => answer === 'interest').length
      const answerMember: any = []
      QuestionAnswer.map((answer) => {
        const memberMysteryCount = answer.type.filter((member) => member === 'mystery').length
        const memberCoolCount = answer.type.filter((member) => member === 'cool').length
        const memberCuteCount = answer.type.filter((member) => member === 'cute').length
        const memberExpressionCount = answer.type.filter((member) => member === 'expression').length
        const memberInterestCount = answer.type.filter((member) => member === 'interest').length
        const searchAnswer = [
          memberMysteryCount === mysteryCount && mysteryCount !== 0,
          memberCoolCount === coolCount && coolCount !== 0,
          memberCuteCount === cuteCount && cuteCount !== 0,
          memberExpressionCount === expressionCount && expressionCount !== 0,
          memberInterestCount === interestCount && interestCount !== 0,
        ]
        const searchCount = searchAnswer.filter((search) => search === true).length
        if (searchCount >= 1) {
          answerMember.push(answer)
        }
      })
      setQuestion([])
      setQuestionNumber(1)
      setAnswer(answerMember)
    }
  }
  const nextQuestion = (text: string) => {
    const num = questionNumber + 1
    setQuestionNumber(num)
    setQuestionAnswers([...questionAnswers, text[1]])
    getQuestion(num)
  }
  const result = () => {
    setDisplayAnswer(answer)
    setAnswer([])
  }
  const handleOpen = useCallback((e: any) => {
    const alt = e.target.alt
    const src = e.target.src
    const name = alt.slice(0, e.target.alt.indexOf('の'))
    let img_src = src.substr(src.indexOf('member') + 7)
    setSelectedImg({ name: name, src: img_src })
    setOpen(true)
  }, [])
  const handleClose = () => setOpen(false)
  const handleClick = async () => {
    const userInfo: Props = {
      id: user.uid,
      first_favorite: { name: selectedImg.name, src: selectedImg.src },
    }
    dispatch(userSaveBookmark(userInfo))
    await dispatch(setImages({ uid: userInfo.id, sign: true }))
    router.push({ pathname: '/top', query: { first_come: true } })
  }
  const box = css`
    margin: 100px auto;
    width: 90%;
  `
  const title_text = css`
    color: #000;
    display: grid;
    place-items: center;
    margin: 40px 0;
    font-size: 2rem;
    font-weight: bold;
  `
  const button_box = css`
    display: grid;
    place-items: center;
    margin: 40px 0;
  `
  const question_container = css`
    display: grid;
    place-items: center;
  `
  const qnum_text = css`
    font-size: 2vw;
  `
  const q_texts = css`
    margin: 20px 0;
    display: grid;
    place-items: center;
  `
  const answer_container = css`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  `
  const answer_box = css`
    width: 30vw;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 300px;
    &:hover {
      opacity: 0.7;
    }
  `
  const answer_textbox = css`
    text-align: center;
  `
  const answer_text = css`
    font-size: 1.4rem;
    margin: 20px 0;
  `
  const name_text = css`
    font-size: 1.6rem;
    margin: 10px 0;
  `
  const modal_name = css`
    font-size: 0.8rem;
    margin: 10px 0;
  `
  const result_button = css``
  return (
    <Box component='div' css={box}>
      <button onClick={() => router.back()}>お気に入り登録一覧に戻る</button>
      <Typography css={title_text}>好きなメンバーを診断しよう！</Typography>
      <SelectModal open={open} handleClose={handleClose}>
        <Image
          className={styles.member_img}
          src={`/assets/member/${selectedImg.src}`}
          alt={'member_img'}
          width={150}
          height={150}
        />
        <div className={styles.favorite_modal}>
          <Typography variant='h4' css={modal_name}>
            {selectedImg.name}
          </Typography>
          <PrimaryButton
            label='button'
            color='#fff'
            background='#ff69b8'
            variant='contained'
            onClick={handleClick}
          >
            このメンバーにする
          </PrimaryButton>
        </div>
      </SelectModal>
      <Box css={button_box} component='div'>
        {answer.length === 0 && question.length === 0 ? (
          <PrimaryButton
            label='button'
            background='orange'
            onClick={() => getQuestion(questionNumber)}
            variant='contained'
            color='#fff'
          >
            始める
          </PrimaryButton>
        ) : (
          ''
        )}
        {question.length !== 0 ? (
          <Box css={question_container}>
            <Typography css={qnum_text}>Q.{questionNumber}</Typography>
            <Box css={q_texts}>
              {question?.map((text: string, i: number) => (
                <Box component='div' key={i} onClick={() => nextQuestion(text)}>
                  <ShowText color={COLORS[i]} text={text[0]} />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          ''
        )}
        {answer.length !== 0 ? (
          <PrimaryButton
            label='button'
            background='orange'
            onClick={result}
            variant='contained'
            color='#fff'
          >
            結果
          </PrimaryButton>
        ) : (
          ''
        )}
      </Box>
      {displayAnswer.length !== 0 ? (
        <Box>
          <Box css={answer_textbox}>
            <Typography css={answer_text}>以下のメンバーがタイプですね</Typography>
            <Typography css={answer_text}>気になったメンバーを登録しよう</Typography>
          </Box>
          <Box css={answer_container}>
            {displayAnswer.map((member, index: number) => (
              <Box css={answer_box} key={index}>
                <Image
                  onClick={(e) => handleOpen(e)}
                  src={`/assets/member/${member.src}`}
                  alt={member.name + 'の画像'}
                  width={300}
                  height={400}
                />
                <p css={name_text}>{member.name}</p>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export const ShowText = ({ text, color }: { text: string; color: string }) => {
  const show_text = css`
    background: ${color};
    width: fit-content;
    padding: 10px 20px;
    border-radius: 0.5em;
    margin: 20px 0;
    font-size: 1.6vw;
    color: #fff;
  `
  return (
    <Typography css={show_text}>
      <button>{text}</button>
    </Typography>
  )
}
