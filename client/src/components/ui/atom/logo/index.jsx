import './index.css';
import logo from '../../../../assets/images/logo.svg';
const Logo = () => {
    return (
        <div className='logo__wrapper'><img src={logo} height="20" className='logo__img' /></div>
    )
}

export default Logo;