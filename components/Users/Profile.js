import classes from "./Profile.module.css";
import Modal from "./../UI/Modal";
import { useState } from "react";
import { uploadImage } from "../../utils/APIRoutes";

function Profile(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const token = localStorage.getItem("token");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    console.log(fileName);
    console.log(file);

    const formData = new FormData();
    console.log(formData);
    formData.append("photo", file);
    // formData.append("fileName", fileName);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    console.log(formData);
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
  };

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
