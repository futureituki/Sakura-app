import { Box } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect, useRef, FC } from 'react'
import { AudioBar } from '@/components/audio/audio-bar'
type Props = {
  src: string
  name: string
  img: string
  number: string
  time: string
}
export const Music: FC<Props> = ({ src, name, img, number, time }) => {
  const [playState, setPlayState] = useState<string>('stop')
  const [duration, setDuration] = useState<number>(0)
  const [timePosition, setTimePosition] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [source, setSource] = useState<MediaElementAudioSourceNode>()
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtxRef = useRef<any>(null)
  const timeRef = useRef<any>(null)
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
      if (localStorage.getItem('playCount')) {
        const count = Number(localStorage.getItem('playCount')) + 1
        localStorage.setItem('playCount', String(count))
        setCount(count)
      } else {
        localStorage.setItem('playCount', '1')
      }
    }
    if (playState === 'play') {
      if (audioRef.current == null) return
      audioRef.current.pause()
      setPlayState('stop')
      const count = Number(localStorage.getItem('playCount')) - 1
      localStorage.setItem('playCount', String(count))
      setCount(count)
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
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setPlayState('stop')
    }
  }
  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayState('play')
    }
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          margin: '10px 0 0 0',
          width: '95vw',
        }}
        onClick={handleTogglePlay}
      >
        <Image
          src={img}
          alt={name}
          width={80}
          height={80}
          style={{
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            borderTop: '1px solid #f2f2f2',
            borderBottom: '1px solid #f2f2f2',
            width: '80%',
            padding: '20px 0',
          }}
        >
          <p>{number}</p>
          <p>{name}</p>
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
      <Box
        sx={{
          position: 'fixed',
          bottom: `${count}px`,
          left: '0',
        }}
        style={
          playState === 'play'
            ? { display: 'block', zIndex: 999 }
            : { display: 'none', zIndex: 999 }
        }
      >
        <AudioBar>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
            }}
          >
            <Image
              src={img}
              alt={name}
              width={40}
              height={40}
              style={{
                objectFit: 'cover',
                borderRadius: '20%',
              }}
            />
            <p style={{ color: '#fff' }}>{name}</p>
          </Box>
          <button type='button' onClick={() => audioRef.current?.play()}>
            <Image src={'/assets/start.png'} alt='start-button' width={30} height={30} />
          </button>
          <button onClick={() => audioRef.current?.pause()}>
            <Image src={'/assets/stop.png'} alt='start-button' width={30} height={30} />
          </button>
          <input
            type='range'
            min={0}
            max={duration}
            value={timePosition}
            onInput={handleChangeTimePosition}
          />
          <Box sx={{ color: '#fff' }}>{`${timeRef.current} / ${time}`}</Box>
        </AudioBar>
      </Box>
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
