import { useState, useEffect } from "react";

export default function Content() {

  // Get memes from API (will receive 100 popular memes)
  const [memesData, setMemesData] = useState([])
    
    useEffect(function(){
        fetch("https://api.imgflip.com/get_memes") //--> Receives 100 memes from api. 
            .then(res => res.json())
            .then(arrayOfMemes => setMemesData(arrayOfMemes.data.memes)) // Stores it in state
    }, [])
  
  // Set state for text captions to display
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgUrl: "http://i.imgflip.com/1bij.jpg",
  });

  // update state on every keystroke in the inputs
  function handleChange(event){
    //console.log("Changed!") // --> will log "changed" every time there is a keystroke
    const value = event.currentTarget.value;
    const selectedInput = event.currentTarget.name;
    // We use the name attribute of the input, to know which of the inputs this function should update. 
    setMeme(prev => ({
        ...prev,
        [selectedInput]: value  // --> name either will be "topText" or "bottomText", and we set the name attribute in the input exactly the same spelling than the state object key.
    }))
  }

  // Get a random meme image from the array and update state to display
  function getMeme(){
    const index = Math.floor(memesData.length * Math.random())
    console.log(memesData[index])
    setMeme(prevMeme => ({
      ...prevMeme,
      imgUrl: memesData[index].url
    }))
    
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input type="text" placeholder="One does not simply" name="topText" onChange={handleChange} value={meme.topText} />
        </label>

        <label>
          Bottom Text
          <input type="text" placeholder="Walk into Mordor" name="bottomText" onChange={handleChange} value={meme.bottomText} />
        </label>
        <button
          onClick={getMeme}
          >Get a new meme image 🖼
        </button>
      </div>

      <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
