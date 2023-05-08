import "../css/boxmess.css";

function BoxMess({ check, message }) {

  return (
    <>
      <div
        className="box_mess fl"
        style={{
          minHeight: "50px",
          width: "100%",
          padding: "10px 8px",
          alignItems: "center",
          justifyContent: check ? "left" : "right",
        }}
      >
        {check ? (
          <>
            <img
              style={{ width: "50px", height: "50px" }}
              alt=""
              src={message.usersender.avatar}
            />
            <span
              style={{
                marginLeft: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "20px",
                borderRadius: "15px",
              }}
              className="box_mess_content"
            >
              {message.content}
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                marginLeft: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "20px",
                borderRadius: "15px",
              }}
              className="box_mess_content"
            >
              {message.content}
            </span>
            <img
              style={{ width: "50px", height: "50px" }}
              alt=""
              src={message.usersender.avatar}
            />
          </>
        )}
      </div>
    </>
  );
}

export default BoxMess;
