import classes from "./ChatInput.module.css";
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

function ChatInput(props) {
  const { handleSendMsg } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className={classes.chat__input}>
      <div className={classes.button_container}>
        <div className={classes.emoji}>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker onEmojiClick={onEmojiClick} className={classes.picker} />
          )}
        </div>
      </div>

      <form className={classes.message__form} onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className={classes.button}>
          <IoMdSend className={classes.sendemoji}/>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
