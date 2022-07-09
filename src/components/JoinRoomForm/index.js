import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./index.css";
import { joinRoom } from "../../service";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("roomCode")) {
      navigate("../room/", { replace: true });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  const [error, setError] = useState(null);
  const onSubmit = (data) => {
    let err = joinRoom(data);
    err && setError(err);
  };

  // TODO: Create error message
  return (
    <form className="join-room-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Join a room</h2>
      <label htmlFor="room-code">Room code:</label>
      <input
        type="text"
        id="room-code"
        {...register("code", { maxLength: 6, minLength: 6 })}
        maxLength={6}
        autoComplete="off"
      />
      {errors.code?.type === "minLength" && (
        <div className="error-field">Code is too short</div>
      )}
      {errors.code?.type === "maxLength" && (
        <div className="error-field">Code is too long</div>
      )}
      {error && <div className="error-field">{error}</div>}
      <button type="submit">Join!</button>
    </form>
  );
};

export default JoinRoomForm;