import React from "react";
import { generateAvatar } from "../utils/avatarGenerator";

type AvatarProps = {
  stats: Record<string, any>;
};

const Avatar: React.FC<AvatarProps> = ({ stats }) => {
  const avatar = generateAvatar(stats);
  return <div className="text-6xl text-center my-4">{avatar}</div>;
};

export default Avatar;
