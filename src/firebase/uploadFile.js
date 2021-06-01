import { storage } from "./firebase";

const upload_file = (imageAsFile, callback) => {
  let timestamp = new Date().getTime();
  const uploadTask = storage
    .ref(`/images/${timestamp}${imageAsFile.name}`)
    .put(imageAsFile);
  uploadTask.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot);
    },
    (err) => {
      //catches the errors
      console.log(err);
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref("images")
        .child(timestamp+imageAsFile.name)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          callback(fireBaseUrl);
        });
    }
  );
};

export default upload_file;
