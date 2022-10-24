import { useEffect, useState } from 'react';

import './App.css';
import { Stack, Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import Clip from './components/Clip'

const App = () => {
  const [clips, setClips] = useState([])
  const [newClip, setNewClip] = useState('')

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
      setClips(old => [response.data, ...old])
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
    <div className='app'>
      <h1 className="text-center mb-4">📌 Corkboard 📌</h1>

      <Form onSubmit={addClip}>
      <Form.Group>
        <Form.Label><b>New Clip</b></Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="Paste here..." value={newClip} onChange={handleClipChange}/>
      </Form.Group>
      <br/>
      <Stack direction="horizontal" gap={1}>
        <Button variant="outline-primary mb-3" type='submit'>Save</Button>
        <Button variant="outline-secondary mb-3" onClick={ () => { setNewClip('') } }>Clear</Button>
      </Stack>
      </Form>

     {clips.map(clip =>
      <>
        <br />
          <Card border="secondary">
          <Card.Body>
            <div classname="clip">
              <Clip key={clip.id} clip={clip} deleteClip={() => deleteClip(clip.id)} /> 
            </div>  
          </Card.Body>
        </Card>
        </>
      )}
    </div>
  )
}
export default App;