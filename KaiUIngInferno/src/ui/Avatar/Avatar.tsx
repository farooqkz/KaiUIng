import "./Avatar.css";
import AvatarProps from "./Avatar.d";


let presenceColor: Map<string, string> = new Map([
  ["online", "green"],
  ["offline", "gray"],
  ["unavailable", "orange"],
]);

function Avatar({ avatar, online }: AvatarProps) {
  return (
    <div className="avatar">
      <img className="avatar-img" alt="" src={avatar} />
      {online ? (
        <div
          className="avatar-presence"
          style={{ "background-color": presenceColor.get(online) }}
        ></div>
      ) : null}
    </div>
  );
}

export default Avatar;
