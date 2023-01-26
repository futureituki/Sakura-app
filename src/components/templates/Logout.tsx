import { css } from '@emotion/react'
export const Logout = () => {
  const styleContainer = css`
  display:flex;
  align-items:center;
  justify-content:center;
  &:hover {
  `
  const style_text = css`
    color: red;
  `
  return (
    <div css={styleContainer}>
      <h2 css={style_text}>ログアウトに成功しました。</h2>
      <h3>この画面を閉じてください。</h3>
    </div>
  )
}
