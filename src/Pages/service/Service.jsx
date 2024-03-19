import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  getServiceCall,
  updateServiceCall,
} from "../../context/serviceContext/ServiceApiCalls";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import "./Service.css";

let firstLoad = true;
let foundService;

const Service = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { services, dispatch } = useContext(ServiceContext);

  useEffect(() => {
    getServiceCall(params.serviceId, dispatch);
  }, [dispatch]);

  let [updatedService, setUpdatedService] = useState([]);
  if (services && firstLoad) {
    foundService = services[0];
    updatedService = foundService;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedService({ ...updatedService, [e.target.name]: value });
  };

  const handleChooseImage = (e) => {
    firstLoad = false;
    setImg(e.target.files[0]);
    setUpdatedGalleryImage({
      ...updatedGalleryImage,
    });
  };

  const upload = (items) => {
    setIsUploading(true);
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/img/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // console.log("Upload is " + progress + "% completed.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const imagePath = downloadURL.slice(39);
            const optimizedImgUrl = `${
              import.meta.env.VITE_IMAGEKIT_BASEURL
            }${imagePath}`;
            setUpdatedGalleryImage((prev) => {
              return { ...prev, [item.label]: optimizedImgUrl };
            });
            setUploaded((prev) => prev + 1);
          });
          setIsUploading(false);
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateService = async () => {
      await updateServiceCall(updatedService, dispatch);
      setIsDone(true);
    };
    updateService();
    // window.location.reload();
    // getServiceCall(params.ServiceId, dispatch);
    // return navigate(`/Services`);
  };

  return !updatedService ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Our Services</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Service Title: </span>
            <span className="postName">{foundService.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Service Subtitle: </span>
            <span className="postName">{foundService.subtitle}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Description: </span>
            <span className="postName">{foundService.desc}</span>
          </div>
          {foundService?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  key={foundService?.img}
                  className="postImg gimage"
                  src={foundService?.img}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Service Title</label>
              <input
                type="text"
                placeholder={foundService?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Service Subtitle</label>
              <input
                type="text"
                placeholder={foundService?.subtitle}
                name="subtitle"
                onChange={handleChange}
              />
              <label>Description</label>
              <textarea
                name="desc"
                onChange={handleChange}
                placeholder={foundService?.desc}
                id=""
                cols="30"
                rows="10"
              ></textarea>
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={handleChooseImage}
              />
            </div>
            {!img || uploaded === 1 ? (
              <button className="newPostButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="newPostButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Service;
