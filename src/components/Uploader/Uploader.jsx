import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const UploadSection = ({
  fileName,
  setFileName,
  setImage,
  handleImageChange,
  handleClick,
  image,
}) => {

  return (

    <div className="w-full max-w-md mx-auto text-center">
      <form onClick={() => document.querySelector(".input-field").click()}>
        <div className="flex items-center justify-center w-full mb-6 backdrop-blur-lg">
          {image ? (
            <img
              src={image}
              width={300}
              height={300}
              alt={fileName}
              className="rounded-lg"
            />
          ) : (
            <div className="border-2 border-white w-full h-full border-dotted rounded-lg py-12 cursor-pointer flex flex-col items-center mt-8">
              <MdCloudUpload color="#06b6d4" size={60} className="mb-4" />
              <input
                type="file"
                id="file-input"
                accept="image/*"
                className="input-field hidden"
                hidden
                onChange={({ target: { files } }) => {
                  files[0] && setFileName(files[0].name);
                  if (files) {
                    handleImageChange({ target: { files } });
                  }
                }}
              />
              <label className="cursor-pointer block mb-2 text-sm font-medium text-white">
                Browse Files to Upload
              </label>
            </div>
          )}
        </div>
      </form>
      <section className="flex items-center justify-center mb-6">
        <AiFillFileImage color="#1e293b" className="mr-2" />
        <span className="upload-content text-left text-white">
          {fileName}
          <MdDelete
            onClick={() => {
              setFileName("No Selected File");
              setImage(null);
            }}
            className="float-right cursor-pointer text-slate-500 hover:text-slate-700"
          />
        </span>
      </section>
    </div>
  );
};

export default UploadSection;
