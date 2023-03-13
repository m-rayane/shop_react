import { StarSvg } from './svg/star'

export const Rating = ({ className, count }) => {
  return (
    <div className={className}>
      <span className={`${className}__icon`}>
        <StarSvg />
      </span>
      <span className={`${className}__icon`}>
        <StarSvg />
      </span>
      <span className={`${className}__icon`}>
        <StarSvg />
      </span>
      <span className={`${className}__icon`}>
        <StarSvg />
      </span>
      <span className={`${className}__icon`}>
        <StarSvg />
      </span>
      <span className={`${className}__count`}>{count}</span>
    </div>
  )
}
