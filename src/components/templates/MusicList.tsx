import { Box } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect, useRef, FC } from 'react'
type Props = {
  src: string
  name: string
  img: string
  number: string
}
export const Music: FC<Props> = ({ src, name, img, number }) => {
  const [playState, setPlayState] = useState('stop')
  const [duration, setDuration] = useState(0)
  const [timePosition, setTimePosition] = useState(0)
  const [source, setSource] = useState<MediaElementAudioSourceNode>()
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtxRef = useRef<any>(null)
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          margin: '20px 0',
        }}
      >
        <Image src={img} alt={name} width={150} height={100} />
        <Box>
          <p>{number}</p>
          <p>{name}</p>
          <button type='button' onClick={handleTogglePlay}>
            {playState === 'stop' && (
              <Image src={'/assets/start.png'} alt='start-button' width={30} height={30} />
            )}
            {playState === 'play' && (
              <Image src={'/assets/stop.png'} alt='start-button' width={30} height={30} />
            )}
          </button>
          <input
            type='range'
            min={0}
            max={duration}
            value={timePosition}
            onInput={handleChangeTimePosition}
          />
        </Box>
      </Box>
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

export const MusicAudio = ({ src }: { src: string }) => {
  const [playState, setPlayState] = useState('stop')
  const [duration, setDuration] = useState(0)
  const [timePosition, setTimePosition] = useState(0)
  const [source, setSource] = useState<MediaElementAudioSourceNode>()
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtxRef = useRef<any>(null)
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
      <Box>
        <button type='button' onClick={handleTogglePlay}>
          {playState === 'stop' && (
            <Image src={'/assets/start.png'} alt='start-button' width={30} height={30} />
          )}
          {playState === 'play' && (
            <Image src={'/assets/stop.png'} alt='start-button' width={30} height={30} />
          )}
        </button>
      </Box>
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
