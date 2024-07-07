// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        کپی رایت © {new Date().getFullYear()}{' '}
       
        <span className='d-none d-sm-inline-block'>  تمامی حقوق این سایت متعلق به
              <a href='https://www.farshbaf-dev.ir' target='_blank' rel='noopener noreferrer'>
        &nbsp;   مهدی فرشباف&nbsp;
        </a>
             میباشد. &nbsp;</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        {/*Hand-crafted & Made with*/}
        {/*<Heart size={14} />*/}
      </span>
    </p>
  )
}

export default Footer
