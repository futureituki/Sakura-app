import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  useState,
  useEffect,
  useRef,
  CanvasHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  RefObject,
  createRef,
  MutableRefObject,
  FC,
} from 'react'
import { musicList } from '@/constant/music-list'
type Props = {
  src: string
  name: string
  img: string
}
export const MusicListPage: FC<Props> = ({ src, name, img }) => {
  const [playState, setPlayState] = useState('stop')
  const [duration, setDuration] = useState(0)
  const [timePosition, setTimePosition] = useState(0)
  const [source, setSource] = useState<MediaElementAudioSourceNode>()
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>()
  const audioCtxRefs = useRef<any[]>([])
  const spectrumRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtxRef = useRef<any>(null)
  const timePositionRef = useRef(null)
  let elementSource: any
  useEffect(() => {
    audioCtxRef.current = new AudioContext()
    if (!elementSource && audioRef.current != null) {
      elementSource = audioCtxRef.current.createMediaElementSource(audioRef.current)
      const analyser = audioCtxRef.current.createAnalyser()
      elementSource.connect(analyser).connect(audioCtxRef.current.destination)
      setSource(elementSource)
      setAnalyserNode(analyser)
    }
  }, [])
  useEffect(() => {
    if (audioRef.current == null) return
    const duration = audioRef.current.duration
    setDuration(duration)
  }, [[audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState]])

  const handleTogglePlay = () => {
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
      setPlayState('play')
    }

    if (playState === 'stop') {
      if (audioRef.current == null) return
      audioRef.current.play()
      setPlayState('play')
    }
    if (playState === 'play') {
      if (audioRef.current == null) return
      audioRef.current.pause()
      setPlayState('stop')
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current == null) return
    setTimePosition(audioRef.current.currentTime)
  }

  const handleEnded = () => {
    setTimePosition(0)
    setPlayState('stop')
  }

  const handleLoadedMetadata = () => {
    console.log(audioRef.current)
    if (audioRef.current == null) return
    const duration = audioRef.current.duration
    setDuration(duration)
  }

  const handleChangeTimePosition = (e: any) => {
    const position = parseInt(e.target.value)
    setTimePosition(position)
    if (audioRef.current == null) return
    audioRef.current.currentTime = position
  }

  return (
    <>
      <Image src={img} alt={name} width={300} height={250} />
      <Typography>{name}</Typography>
      <button type='button' onClick={handleTogglePlay}>
        {playState === 'stop' && '開始'}
        {playState === 'play' && '停止'}
      </button>
      <input
        type='range'
        min={0}
        max={duration}
        value={timePosition}
        onInput={handleChangeTimePosition}
      />
      <audio
        src={src}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload='metadata'
      />
    </>
  )
}
