import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Clip from './components/Clip'

const App = () => {
  const [clips, setClips] = useState([])
  const [newClip, setNewClip] = useState('a new note..')

  useEffect(() => {
    console.log('useEffect')
    axios.get('http://localhost:6119/clips')
    .then(response => {
      console.log('promise finished')
      setClips(response.data)
    })
  }, [])

  const addClip = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('content', newClip)
    axios.post('http://localhost:6119/clips', formData)
    .then(response => {
      setClips(clips.concat(response.data))
      setNewClip('')  
    })
  }

  const handleClipChange = (event) => {
    setNewClip(event.target.value)
  }

  const deleteClip = (id) => {
    axios.delete('http://localhost:6119/clips/' + id)
    .then(response => {
      console.log('promise finished')
      setClips(clips.filter(clip => clip.id !== id))
    })
  }

  return (
    <div>
      <hi> New Clip </hi>
      <form onSubmit={ addClip }>
        <input value={ newClip } onChange={handleClipChange}/>
        <button type='submit'>Save</button>
      </form>

      <h1> Clips </h1>
        {clips.map(clip => 
          <li><Clip key={clip.id} clip={clip} deleteClip={() => deleteClip(clip.id)} /> </li>  
        )}
    </div>
  );
}

export default App;
