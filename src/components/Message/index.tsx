import { useState } from 'react';
import { MessageContainer, Text, Sender } from './styles';
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { Modal, Box, Typography } from '@mui/material';
import Input from '../Input';
import Button from '../Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Message = ({
  messageId,
  username,
  text,
  createdAt,
  onDelete,
  onEdit,
}: {
  messageId: number;
  username: string;
  text: string;
  createdAt: string;
  onDelete: any;
  onEdit: any;
}) => {
  const [open, setOpen] = useState(false);
  const [editMessageText, setEditMessageText] = useState("");
  const handleOpen = () => {
    setOpen(true);
    setEditMessageText(text);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <MessageContainer>
      <Sender>
        {username} {createdAt}
      </Sender>
      <RiPencilFill onClick={handleOpen}></RiPencilFill>
      <Text>{text}</Text>
      <FaTrash onClick={() => onDelete(messageId)}></FaTrash>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edite sua mensagem
          </Typography>
          <form onSubmit={(e) => {
            handleClose();
            onEdit(e, messageId, editMessageText);
          }}>
            <Input
              width={'80%'}
              value={editMessageText}
              onChange={setEditMessageText}
              placeholder='Message'
            />
            <Button>Send</Button>
          </form>
        </Box>
      </Modal>
    </MessageContainer>
  );
};

export default Message;
