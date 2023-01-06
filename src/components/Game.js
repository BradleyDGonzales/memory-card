import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import bulkImages from './bulkImages';
import fail from '../sound/fail.ogg'
import Header from './Header';


let initialLists = [
    { imgName: 'ann', clicked: false },
    { imgName: 'arisu', clicked: false },
    { imgName: 'chishiya', clicked: false },
    { imgName: 'chota', clicked: false },
    { imgName: 'karube', clicked: false },
    { imgName: 'kuina', clicked: false },
    { imgName: 'kuzuryu', clicked: false },
    { imgName: 'kyuma', clicked: false },
    { imgName: 'lastboss', clicked: false },
    { imgName: 'niragi', clicked: false },
    { imgName: 'tatta', clicked: false },
    { imgName: 'usagi', clicked: false },
]
const Game = () => {
    const [click, setClick] = useState(initialLists)
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(score);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        shuffle(bulkImages);
    })
    function checkWin() {
        let count = 0;
        click.map((img) => {
            if (img.clicked === true) {
                count++;
                if (count === 11) {
                    return alert('won');
                }
            }
        })
        console.log('u win')
    }
    function handleImgClick(e) {
        const audio = new Audio(fail);
        audio.preload = "auto";
        audio.volume = 0.2;
        const imgSrc = e.target.src;
        const currentImgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1, imgSrc.indexOf('.'))
        const updatedImg = click.map((img) => {
            if (img.imgName === currentImgName) {
                if (img.clicked === true) {
                    audio.play();
                    setScore(score - score)
                    return img;
                }
                else {
                    setScore(score + 1);
                    if (score >= bestScore) {
                        setBestScore(score + 1);
                    }
                    return {  
                        ...img,
                        clicked: true,
                    }
                }
            }
            else {
                return img;
            }
        })
        setClick(updatedImg)
        checkWin()
    }
    console.log(click);
    return (
        <>
            <Header bestScore={bestScore} score={score} />
            <div className="main">

                {(bulkImages.map((img, index) => (
                    <div key={index} className='card'>
                        <img onClick={(e) => handleImgClick(e)} id={'img' + index} key={img} src={img.img} alt={img} className="bulkImage" />
                        <span className='cardName'>{img.imgCardName}</span>
                    </div>
                )))}
            </div>
        </>
    )
}

export default Game;