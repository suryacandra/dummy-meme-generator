import React from 'react'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Main = () => {

    const [tulisan, setTulisan] = useState({
        topText: "",
        bottomText: "",
        image: "http://i.imgflip.com/1bij.jpg",
    })

    const [meme, setMeme] = useState([])

    const [tipe, setTipe] = useState({
        warna: "white"
    })

    console.log(tipe)

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setMeme(data.data.memes))
    }, [])

    
    function handleMemeImage() {
        const mat = Math.floor(Math.random() * meme.length)
        const url = meme[mat].url
        setTulisan(item => ({
            ...item, image: url
        }))
        console.log(url)
    }
    
    function handleMeme(event) {
        const {name, value} = event.target
        setTulisan(item => ({
            ...item,
            [name]: value
         } ))
    }

    function handleWarna(event) {
        const {name, value} = event.target
        setTipe(item => ({
            ...item,
            [name]: value
        }))
    }

  return (
    <div>
        <main className="m-2 p-5 flex flex-col gap-4 justify-center">
            <p className="text-center">Totaly not accurate meme generator</p>
            <p className="text-center">just screenshot to save hehe.</p>

              <input 
              value={tulisan.topText} 
              name="topText" 
              type="text" 
              className="border-2 border-rose-700 rounded-md p-2 bg-rose-200 tracking-wider font-bold placeholder-slate-600 focus:outline-none md:w-1/2 md:self-center" placeholder="Top text..." 
              onChange={handleMeme}
              />


              <input 
              value={tulisan.bottomText} 
              name="bottomText" 
              type="text" 
              className="border-2 border-rose-700 rounded-md p-2 bg-rose-200 tracking-wider font-bold placeholder-slate-600 focus:outline-none md:w-1/2 md:self-center" placeholder="Bottom text..." 
              onChange={handleMeme}
              />

              <button className="bg-rose-700 rounded-md w-1/2 self-center text-white p-1" onClick={handleMemeImage}>Get new meme images</button>
            
                <h1 className="text-sm font-mono font-bold tracking-tighter text-center">Choose text color for the memes</h1>
              <div className="flex justify-center scale-75">
              <select 
                value={tipe.warna}
                onChange={handleWarna}
                name="warna"
                className="bg-rose-300 rounded-md p-2"
            >
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>
              </div>

            <div className="mt-2 p-3 relative w-full md:w-1/2 md:self-center">
                <img src={tulisan.image} className="rounded-md w-full" />
                <div className="absolute top-5 left-[50%] text-center text-4xl translate-x-[-50%]">

                    {tipe.warna === 'black' ? <h1 className="text-black">{tulisan.topText}</h1> : <h1 className="text-white">{tulisan.topText}</h1>}
                    
                    </div>
                <div className="absolute bottom-5 left-[50%] text-center text-4xl translate-x-[-50%]">
                    
                    
                {tipe.warna === 'black' ? <h1 className="text-black">{tulisan.bottomText}</h1> : <h1 className="text-white">{tulisan.bottomText}</h1>}
                    
                    </div>
            </div>
        </main>
    </div>
  )
}

export default Main