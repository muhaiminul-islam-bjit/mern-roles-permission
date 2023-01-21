import './index.css';

const Container = ({margin,children}) => {
    return (<div className={`container--${margin} `}>{children}</div>)
}

export default Container;