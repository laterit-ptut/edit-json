import { useImmer } from "use-immer";
import './App.css';
import FileUploaded from './components/FileUploader'

const App = () => {
    const [data, setData] = useImmer({});
    const [indexSelected, setIndexSelected] = useImmer(0);
    function test() {
      console.log(data);
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
                      {point.videos.map((video, index) =>
                        <div key={index}>
                          <h4>Vidéo {index + 1}</h4>
                          <div className='inputWrapper' >
                            <label>PathFile</label>
                            <input type="text" value={video?.pathFile} onChange={e => {setData(draft => {draft.points[index].longitude = e.target.value})}}></input>
                          </div>
                          <div className='inputWrapper'>
                            <label>PathThumbnails</label>
                            <input type="text" value={video?.pathThumbnails} onChange={e => {setData(draft => {draft.points[index].longitude = e.target.value})}}></input>
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
      <button onClick={test} className="btn">Test</button>
    </div>
    );
}

export default App;
