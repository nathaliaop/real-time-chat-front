import { MessageContainer, Text, Sender } from "./styles";
import { FaTrash } from 'react-icons/fa';

const Message = ({ username, text, createdAt, onDelete }: { username: string, text: string, createdAt: string, onDelete: React.MouseEventHandler<SVGElement> | undefined }) => {

  return (
    <MessageContainer>
      <Sender>{username} {createdAt}</Sender>
      <Text>{text}</Text>
      <FaTrash onClick = { onDelete }></FaTrash>
    </MessageContainer>
  );
}

export default Message;