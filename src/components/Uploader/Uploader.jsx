import {useState} from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {AiFillFileImage} from "react-icons/ai";
import { getBase64 } from "../../helpers/imageHelper";

function Uploader() {

  const [image , setImage] = useState(null)
  const [fileName , setFileName] = useState("No Selected File")
  const [imageInlineData, setImageInlineData] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }


  return (
    <main>
      <form 
       onClick={ () => document.querySelector(".input-field").click()}>
        <input type="file" accept="image/*" className="input-field" hidden
        // onChange={(e) => handleImageChange(e)}
        onChange={({target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            handleImageChange({target: {files}})
          }
        }} />

        {image ? 
        <img src={image} width={300} height={300} alt={fileName} />
        :
        <>
        <MdCloudUpload color='#1475cf' size={60}  />
        <p>Browse Files to Upload</p>
        </>
        }
      </form>

      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf"/>

        <span className="upload-content">
          {fileName}
          <MdDelete onClick = {() => {
            setFileName("No Selected File")
            setImage(null)
          }} />
        </span>
      </section>


    </main>
  );
}

export default Uploader;