import { css, keyframes } from '@emotion/react'
import { Box } from '@mui/material'
export const Loading = () => {
  const loading_wrapper = css`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  `

  const loading_text = css`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #999;
    width: 100px;
    height: 30px;
    margin: -7px 0 0 -45px;
    text-align: center;
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 20px;
  `
  const animation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`
  const loading_content = css`
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 170px;
    height: 170px;
    margin: -85px 0 0 -85px;
    border: 3px solid #f00;
    border: 3px solid transparent;
    border-top-color: #4d658d;
    border-bottom-color: #4d658d;
    border-radius: 50%;
    -webkit-animation: ${animation} 2s linear infinite;
    -moz-animation: ${animation} 2s linear infinite;
    -o-animation: ${animation} 2s linear infinite;
    animation: ${animation} 2s linear infinite;
    &:after {
      content: '';
      position: absolute;
      border: 3px solid #0f0;
      left: 15px;
      right: 15px;
      top: 15px;
      bottom: 15px;
      border: 3px solid transparent;
      border-top-color: #84417c;
      border-bottom-color: #84417c;
      border-radius: 50%;
      -webkit-animation: ${animation} 1.5s linear infinite;
      animation: ${animation} 1.5s linear infinite;
      -moz-animation: ${animation} 2s linear infinite;
      -o-animation: ${animation} 2s linear infinite;
    }
    &:before {
      content: '';
      position: absolute;
      border: 3px solid #00f;
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 5px;
      border: 3px solid transparent;
      border-top-color: #d4cc6a;
      border-bottom-color: #d4cc6a;
      border-radius: 50%;
      -webkit-animation: ${animation} 3s linear infinite;
      -moz-animation: ${animation} 2s linear infinite;
      -o-animation: ${animation} 2s linear infinite;
      animation: ${animation} 3s linear infinite;
    }
  `

  return (
    <Box css={loading_wrapper}>
      <Box css={loading_text}>LOADING</Box>
      <Box css={loading_content}></Box>
    </Box>
  )
}