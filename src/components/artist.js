import React from "react"

const Artist = ({ artist }) => {
  return (
    <div key={artist.artist}>
      <p>
        {artist.artist}
        <br />
        {artist.credit}
      </p>
    </div>
  )
}

export default Artist
