import React, { useEffect, useState } from 'react'
import { CButton, CImage, CSpinner } from '@coreui/react'
import axios from 'axios'


const randomMeme = "https://meme-api.com/gimme"

const Meme = () => {
  const [meme, setMeme] = useState()
  const [loading, setLoading] = useState(true)

  const getRandomMeme = () => {
    setLoading(true)
    axios.get(randomMeme).then((response) => {
      setMeme(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getRandomMeme()
  }, [])

  // display the meme or a spinner if not loaded
  return (
    <>
      {loading ? (
        <CSpinner style={styles.spinner} color="primary" />
      ) : (
        meme && (
          <CImage
            src={meme.url}
            alt="Meme"
            style={styles.image}
          />
        )
      )}
      <CButton color="primary" onClick={getRandomMeme} style={styles.button}>
        Click to see another meme
      </CButton>
    </>
  )
}

const styles = {
  image: {
    width: "60%",
    paddingBottom: "25px"
  },
  button: {
    width: "25%",
    position: "fixed",
    right: 0,
    marginRight: "20px"
  },
  spinner: {
    position: "fixed",
    top: "50%",
    left: "30%"
  }
}

export default Meme
