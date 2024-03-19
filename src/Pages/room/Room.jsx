import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoomCall,
  updateRoomCall,
} from "../../context/roomContext/RoomApiCalls";
import { RoomContext } from "../../context/roomContext/RoomContext";
import "./Room.css";

let firstLoad = true;
let foundRoom;

const Room = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { rooms, dispatch } = useContext(RoomContext);

  useEffect(() => {
    getRoomCall(params.roomId, dispatch);
  }, [dispatch]);

  let [updatedRoom, setUpdatedRoom] = useState([]);
  if (rooms && firstLoad) {
    foundRoom = rooms[0];
    updatedRoom = foundRoom;
  }

  const [isDone, setIsDone] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedRoom({ ...updatedRoom, [e.target.name]: value });
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
    const updateRoom = async () => {
      await updateRoomCall(updatedRoom, dispatch);
      setIsDone(true);
    };
    updateRoom();
    // window.location.reload()
    // getApostolateCall(params.apostolateId, dispatch);
    // return navigate(`/apostolates`);
  };

  return !updatedRoom ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="post">
      {isUploading && <div className="uploading">Uploading Image(s)...</div>}
      {isDone && <div className="uploading">Updated!. Please refresh page</div>}
      <div className="postTitleContainer">
        <h1 className="postTitle">Our Rooms</h1>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Room Title: </span>
            <span className="postName">{foundRoom.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Description: </span>
            <span className="postName">{foundRoom.desc}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Price: </span>
            <span className="postName">${foundRoom.price}</span>
          </div>
          {foundRoom?.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Image: </span>
              <div className="postInfoValue img">
                <img
                  key={foundRoom?.img}
                  className="postImg gimage"
                  src={foundRoom?.img}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Room Title</label>
              <input
                type="text"
                placeholder={foundRoom?.title}
                name="title"
                onChange={handleChange}
              />
              <label>Description</label>
              <textarea
                name="desc"
                onChange={handleChange}
                placeholder={foundRoom?.desc}
                id=""
                cols="30"
                rows="10"
              ></textarea>
              <label>Room Price</label>
              <input
                type="number"
                placeholder={`$${foundRoom?.price}`}
                name="price"
                onChange={handleChange}
              />
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

export default Room;
