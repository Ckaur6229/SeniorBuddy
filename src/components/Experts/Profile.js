import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Profile() {
    const nav = useNavigate();
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const logout = async () => {
    if (window.confirm("Do you really want to logout?")) {
      auth.signOut();
      sessionStorage.clear();
      toast.success("Logout successfully");
      nav("/login");
    }
  };
  const changeImage = (e) => {
    toast.success("Image is selected. Please Upload it by clicking arrow")
    setFileName(e.target.value);
    setFile(e.target.files[0]);
  };
  const uploadImg = (e) => {
    toast.success("Please wait...")
    if (!file || !fileName) {
      toast.error("No file selected or file name is missing");
      return;
    }
    const storageRef = ref(storage, "profileImages/" + fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    if (!!url) {
      saveData();
    }
  }, [url]);
  const userId = sessionStorage.getItem("userId");
  const saveData = async () => {
    try {
      const profileRef = doc(db, "User", userId);
      await updateDoc(profileRef, {
        image: url,
        createdAt: Timestamp.now(),
      });
      const updatedDoc = await getDoc(profileRef);

      if (updatedDoc.exists()) {
        console.log("Updated user data:", updatedDoc.data());
      } else {
        console.log("No such document!");
      }
      nav(0);
      toast.success("Photo Updated Successfully");
      sessionStorage.setItem("image", updatedDoc.data().image);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
        {/*Profile starts*/}
        <div style={{ paddingTop: "100px" }}>
          <div className="text-center mb-3">
            <img
              src={
                sessionStorage.getItem("image")
                  ? sessionStorage.getItem("image")
                  : "/assets/img/profile.png"
              }
              width="200px"
              height="200px"
              style={{ borderRadius: "100px" }}
              onError={(e) => {
                e.target.src = "/assets/img/profile.png";
              }} 
            />
          </div>

          <h3 className="text-center mt-3">{sessionStorage.getItem("name")}</h3>
          <div className="d-flex justify-content-center text-align-center">
            <span className="my-2 btn btn-outline-primary mt-4 mb-5 btn-file">
              Edit Photo
              <input type="file" onChange={changeImage} />
            </span>
            <i
              className="fa fa-upload text-primary"
              style={{ margin: "30px 0px 0px 10px", cursor: "pointer" }}
              onClick={uploadImg}
            ></i>
          </div>
          <form>
            <div className="container">
              <div className="row  justify-content-center my-2">
                <div className="col-md-2">
                  <label>Name</label>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    value={sessionStorage.getItem("name")}
                  />
                </div>
              </div>

              <div className="row  justify-content-center my-2">
                <div className="col-md-2">
                  <label>Email</label>
                </div>
                <div className="col-md-7">
                  <input
                    type="email"
                    className="form-control"
                    value={sessionStorage.getItem("email")}
                  />
                </div>
              </div>

              <div className="row  justify-content-center my-2">
                <div className="col-md-2">
                  <label>Specialization</label>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    value={sessionStorage.getItem("Specialization")}
                  />
                </div>
              </div>

              <div className="row  justify-content-center my-2">
                <div className="col-md-2">
                  <label>Contact</label>
                </div>
                <div className="col-md-7">
                  <input
                    type="number"
                    className="form-control"
                    value={sessionStorage.getItem("contact")}
                  />
                </div>
              </div>

            </div>
          </form>
        </div>
        <div className="d-flex align-items-center justify-content-center my-5">
          <a
            className="btn-hover-bg btn btn-primary text-white py-3 px-5"
            onClick={logout}
          >
            Logout
          </a>
        </div>
        {/*Profile ends*/}
    </>
  )
}
