import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { apiGet, apiPost } from '../../utils/api'
import Podcast from '../Browse/Podcast'
import PDC from './pDCCard.module.css'


const UploadPDC = (prop: any) => {
    
    const {onClose, category} = prop
    
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const [pdImage, setPdImage] = useState<File | null>(null);
    const [pdAudio, setPdAudio] = useState<File | null>(null);
    const song_duration = "420"

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("title", title)
            formData.append("name", artist)
            formData.append("category", category)
            pdImage && formData.append("imageFile", pdImage)
            pdAudio && formData.append("podcastFile", pdAudio)
            pdAudio && formData.append("song_duration", song_duration )
            
            const pod = await (await apiGet("/api/podcast/podcasts")).data.podcasts
       
            console.log(formData.get("title"))
            console.log(formData.get("name"))
            console.log(formData.get("category"))
            console.log(formData.get("imageFile"))
            console.log(formData.get("podcastFile"))
            console.log(formData.get("song_duration"))
            console.log(pod)
           

            const done = await apiPost("/api/podcast/create", formData)
            setTitle('')
            setArtist('')
            setPdImage(null)
            setPdAudio(null)

            console.log(done)
            done && toast.success("Podcast added Successfully")
        } catch (error:any) {
            toast.warning(error)
        }
    }

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPdAudio(event.target.files && event.target.files.item(0)); 
        event.target.files = null
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPdAudio(event.target.files && event.target.files.item(0));
    };

  return (
      <React.Fragment>
          <div className={PDC.modal} onClick={onClose}>

              <div className={PDC.modalcontent} onClick={e => e.stopPropagation()}>
                  <div className={PDC.modalhead}>
                      <h2 className={PDC.modaltitle}>Upload Podcast</h2>
                  </div>
                  <div className={PDC.modalbody}>
                      <form onSubmit={handleSubmit} className={PDC.upload}>
                          
                          <label className={PDC.labels}>Title:
                              <input type="text"
                                  value={title}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                      setTitle(e.target.value)
                                  }}
                                  className={PDC.input}
                                  required />
                          </label>

                          <label className={PDC.labels}>
                              Author's Name:
                              <input type="text"
                                  value={artist}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArtist(e.target.value)}
                                  className={PDC.input}
                                  required />
                          </label>

                          <label className={PDC.labels}>
                              Upload Podcast Image:
                              <input type="file"
                                  accept="image/*"
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                      setPdImage(event.target.files && event.target.files.item(0)) 
                                      event.target.files = null
                                  }}
                                  className={PDC.input}
                                  required />
                          </label>

                          <label className={PDC.labels}>
                              Upload Episode:
                              <input type="file"
                                      accept="audio/*"
                                  onChange={handleAudioChange}
                                  className={PDC.input}
                                  required />
                          </label>

                          <input type="submit" value={'Upload PodCast'} className={PDC.submit} />

                      </form>

                  </div>
                  <div className={PDC.modalfooter}>
                      <button className={PDC.close} onClick={onClose}>CLOSE</button>

                  </div>
              </div>
          </div>
      </React.Fragment>
  )
}

export default UploadPDC