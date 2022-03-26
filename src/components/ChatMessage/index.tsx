import { Container } from './styles';

const ChatMessage = ({ username, text, createdAt }: { username: string, text: string, createdAt: string }) => {
  return (
    <div>
      <h3>{username}</h3>
      <p>{text}</p>
      <p>{createdAt}</p>
    </div>
  );
}

export default ChatMessage;