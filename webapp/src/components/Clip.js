import React from "react"

const Clip = ({ clip, deleteClip }) => {
    return (
        <> 
          { clip.content }
          <i> which was created at { new Date(Date.parse(clip.created_at)).toDateString() }</i>
          <button onClick={ () => {navigator.clipboard.writeText(clip.content)}}>Copy</button> 
          <button onClick={deleteClip}>Delete</button> 
        </>
    )
  }
export default Clip