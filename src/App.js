import React, {useRef} from 'react';
import { useImmer } from "use-immer";
import './App.css';
import FileUploaded from './components/FileUploader';

const App = () => {
    const [data, setData] = useImmer({});
    const [indexSelected, setIndexSelected] = useImmer(0);
    const [href, setHref] = useImmer(null);
    const inputRef = useRef(null);

    function exportJson() {
      console.log(data);
      setHref("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)));
      setTimeout(()=> {
        inputRef.current.click();
      }, 500);
    }

    function addPoint() {
      setData(data => {
        data.points.push(
          {
            name : {"mg" : "", "fr" : "Nouveau point", "en" : ""},
            "latitude" : 19.642588,
            "longitude" : 46.801060,
            "videos" : [
              {"pathFile" : "", "pathThumbnail" : ""},
              {"pathFile" : "", "pathThumbnail" : ""},
              {"pathFile" : "", "pathThumbnail" : ""}
            ]
          }
        )
      });
    }

    function deletePoint(index) {
      setData(data => {
        data.points.splice(index, 1);
      });
      setIndexSelected(0);
    }

    return (
    <div className="App">
      {/* FileUploaded  */}
      {(Object.keys(data).length === 0) &&
        <div className="input">
          <FileUploaded
            onFileSelectSuccess={(file) => setData(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
        </div>
      }
      {(Object.keys(data).length > 0) &&
        <div className="content">
          {data["points"].map((point, index) =>
            <div key={index}>
              <div className='point'>
                <div className="pointHeader" onClick={() => setIndexSelected(index)}>
                  <h2 >{point?.name?.fr}</h2>
                  <span className="material-icons-outlined"  onClick={() => {deletePoint(index)}}>delete</span>
                </div>
                
                {(indexSelected === index) &&
                  <div className="pointContent">

                    <h3>Noms du point :</h3>
                    <div className='inputWrapper'>
                      <label>Nom en mg</label>
                      <input type="text" value={point?.name?.mg} onChange={e => {setData(draft => {draft.points[index].name.mg = e.target.value})}}></input>
                    </div>
                    <div className='inputWrapper'>
                      <label>Nom en français</label>
                      <input type="text" value={point?.name?.fr} onChange={e => {setData(draft => {draft.points[index].name.fr = e.target.value})}}></input>
                    </div>
                    <div className='inputWrapper'>
                      <label>Nom en anglais</label>
                      <input type="text" value={point?.name?.en} onChange={e => {setData(draft => {draft.points[index].name.en = e.target.value})}}></input>
                    </div>

                    <h3>Texte du point :</h3>
                    <div className='inputWrapper'>
                      <label>Texte en mg</label>
                      <input type="text" value={point?.text?.mg} onChange={e => {setData(draft => {draft.points[index].text.mg = e.target.value})}}></input>
                    </div>
                    <div className='inputWrapper'>
                      <label>Texte en français</label>
                      <input type="text" value={point?.text?.fr} onChange={e => {setData(draft => {draft.points[index].text.fr = e.target.value})}}></input>
                    </div>
                    <div className='inputWrapper'>
                      <label>Texte en anglais</label>
                      <input type="text" value={point?.text?.en} onChange={e => {setData(draft => {draft.points[index].text.en = e.target.value})}}></input>
                    </div>

                    <h3>Coordonnées du point :</h3>
                    <div className='inputWrapper'>
                      <label>Latitude</label>
                      <input type="number" value={point?.latitude} onChange={e => {setData(draft => {draft.points[index].latitude = e.target.value})}}></input>
                    </div>
                    <div className='inputWrapper'>
                      <label>Longitude</label>
                      <input type="number" value={point?.longitude} onChange={e => {setData(draft => {draft.points[index].longitude = e.target.value})}}></input>
                    </div>

                    <h3>Vidéos du point :</h3>
                    <div className="videosContent">
                      {point.videos.map((video, indexV) =>
                        <div key={indexV}>
                          <h4>Vidéo {indexV + 1}</h4>
                          <div className='inputWrapper' >
                            <label>Lien du fichier vidéo</label>
                            <input type="text" value={video?.pathFile} onChange={e => {setData(draft => {draft.points[index].videos[indexV].pathFile = e.target.value})}}></input>
                          </div>
                          <div className='inputWrapper'>
                            <label>Lien de la miniature</label>
                            <input type="text" value={video?.pathThumbnail} onChange={e => {setData(draft => {draft.points[index].videos[indexV].pathThumbnail = e.target.value})}}></input>
                          </div>
                        </div>                    
                      )}
                    </div>
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      }
      {(Object.keys(data).length > 0) &&
        <div className="bottomWrapper">
          <button onClick={addPoint} className="btn">Ajout point</button>
          <button onClick={exportJson} className="btn">Export</button>
        </div>
      }
      <a ref={inputRef} id="downloadAnchorElem" download="scene.json" href={href} style={{"display":"none"}}>ref</a>
    </div>
    );
}

export default App;
