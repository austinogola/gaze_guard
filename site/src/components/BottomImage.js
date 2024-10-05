

import './styles/BottomImage.css'
import lapiImg from '../images/lapiBtm.png'

import logoImg from '../images/bottomimg.png'
const BottomImage=()=>{
    return (
        <div className='bottomImageDiv'>


            <div className='bottom-holder'>
                <div className='mainImgHolder'>
                    {/* <img src={btmImg}/> */}
                </div>
                <div className='logoImgHolder'>
                    <img src={logoImg}/>
                </div>
                <div className='textDiv'>
                    <p>Download your</p>
                    <p><span>Extension </span> from here</p>
                    <button>DOWNLOAD</button>
                </div>

                <div className='lapHolder'>
                    <img src={lapiImg}/>
                </div>
            </div>
        </div>
    )
}



export default BottomImage