import React from 'react'
type PresenterProps = {
  tag: any
  visualLevel: number
  className?: string
}
export const HeadingPresenter = ({
  tag: Tag,
  visualLevel,
  className,
  ...props
}: PresenterProps) => {
  return <Tag className={[`h${visualLevel}`, className].join('')} {...props} />
}
type ContainerProps = {
  presenter: typeof HeadingPresenter
  visualLevel: number
  level: number
  className?: string
}
export const HeadingContainer = ({
  presenter,
  visualLevel,
  level = 2,
  className,
  ...props
}: ContainerProps) => {
  level = Math.max(1, Math.min(6, level))
  visualLevel = typeof visualLevel !== 'undefined' ? visualLevel : level
  const tag = `h${level}`

  return presenter({ tag, visualLevel, className, ...props })
}

export const Heading = (props: any) => {
  return (
    <HeadingContainer
      presenter={(presenterProps) => <HeadingPresenter {...presenterProps} />}
      {...props}
    />
  )
}
