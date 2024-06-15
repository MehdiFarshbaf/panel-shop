import classnames from 'classnames'
import "@styles/react/app-loader.scss"
import { useSkin } from "@hooks/useSkin";

const ComponentSpinner = ({ className }) => {
  const { skin } = useSkin()
  
  return (
    <div
         className={classnames('fallback-spinner', {
           [className]: className,
           'dark-layout': skin === 'dark'
         })}
    >
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default ComponentSpinner
