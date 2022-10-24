import React from "react"
import moment from 'moment';
import { Stack, Button, Container } from 'react-bootstrap';

const Clip = ({ clip, deleteClip }) => {
    return (
      <Container>
        <p className="fs-5" style={{ whiteSpace: 'pre-wrap' }}> { clip.content } </p>
        <Stack direction="horizontal" gap={1}>
          <span class="text-muted d-inline-block align-middle"> 
            Saved { moment.utc(new Date(Date.parse(clip.created_at))).local().startOf('seconds').fromNow() } 
          </span>
          <Button size="sm" variant="secondary" onClick={ () => {navigator.clipboard.writeText(clip.content)}}>
            <i class="bi bi-clipboard"></i>
          </Button> 
          <Button size="sm" variant="outline-secondary" onClick={deleteClip}>
            <i class="bi bi-trash"></i>
          </Button> 
        </Stack>
     </Container>
    )
  }
export default Clip