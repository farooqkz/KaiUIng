import "./Avatar.css";


let presenceColor: Map<string, string> = new Map([
  ["online", "green"],
  ["offline", "gray"],
  ["unavailable", "orange"],
]);

type AvatarProps = {
  avatar: string;
  online?: string;
};

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
