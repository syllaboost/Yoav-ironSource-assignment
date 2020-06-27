import React from 'react';
import './style.css';
import Lottie from 'react-lottie';
import StartBtn from '../../assets/play.json';
import DownloadBtn from '../../assets/download.json';
import SpinBtn from '../../assets/spin.json';

function Button({
    btnType,
    handleClickEvent,
}) {
    const calcConfig = () => {
        switch(btnType) {
            case 'start':
                return (
                    {
                        type: StartBtn,
                        height: 100,
                        width: 250,
                    }
                );
            case 'spin':
                return (
                    {
                        type: SpinBtn,
                        height: 150,
                        width: 150,
                    }
                );
            case 'download':
                 return (
                    {
                        type: DownloadBtn,
                        height: 60,
                        width: 250,
                    }
                );
            default:
                return (
                    {
                        type: StartBtn,
                        height: 100,
                        width: 250,
                    }
                );
        }
    }
    const configurations = calcConfig();
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: configurations.type,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
        <div style={{height: configurations.height, width: configurations.width, margin: "auto"}} onClick={handleClickEvent} > 
            <Lottie 
                options={defaultOptions}
                height={configurations.height}
                width={configurations.width} />
        </div>
        
    )
}

export default Button;
