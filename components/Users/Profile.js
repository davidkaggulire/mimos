import classes from "./Profile.module.css";
import Modal from "./../UI/Modal";
import { useEffect, useState } from "react";
import { getCurrentUserRoute, uploadImage } from "../../utils/APIRoutes";
import axios from "axios";

function Profile(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const token = localStorage.getItem("token");
  const { currentUser } = props;

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  

  const uploadFile = async (event) => {
    event.preventDefault();
    console.log(fileName);
    console.log(file);
    console.log(currentUser);

    const formData = new FormData();
    formData.append("photo", file);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const response = await fetch(uploadImage, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      // console.log("success");
    } catch (ex) {
      console.log(ex);
    }

    if (currentUser) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const userResponse = await axios.get(
          `${getCurrentUserRoute}/${currentUser._id}`,
          {headers: headers}
        );

        console.log(userResponse.data.data.data);
        localStorage.setItem("chat-user", JSON.stringify(userResponse.data.data.data));

        // setAllUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    uploadFile(event);
  }, [])

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.profile}>
        <div>Change Profile Photo</div>
        <form
          className={classes.form}
          onSubmit={uploadFile}
          encType="multipart/form-data"
        >
          <label className={classes.profile__photo}>
            <input
              type="file"
              name="photo"
              className={classes.input}
              accept="image/*"
              required="required"
              onChange={saveFile}
            />
          </label>

          <button type="submit" className={classes.btn__upload}>
            Upload
          </button>
        </form>

        {/* {isLoading && <LoadingSpinner />} */}
      </div>
    </Modal>
  );
}

export default Profile;
