import { useState } from 'react';

import { MessageContainer, MessageContent, IconsContainer, Form, Text, Sender, } from './styles';
import Input from '../Input';
import Button from '../Button';

import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Message = ({
  messageId,
  userId,
  user,
  text,
  createdAt,
  onDelete,
  onEdit,
}: {
  messageId: number;
  userId: number;
  user: any;
  text: string;
  createdAt: string;
  onDelete: any;
  onEdit: any;
}) => {
  const [open, setOpen] = useState(false);
  const [editMessageText, setEditMessageText] = useState('');
  const handleOpen = () => {
    setOpen(true);
    setEditMessageText(text);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MessageContainer userId={userId} messageUserId={user.id}>
      <Sender userId={userId} messageUserId={user.id}>
        {user.username} {createdAt}
      </Sender>
      <MessageContent userId={userId} messageUserId={user.id}>
        <Text>{text}</Text>
        {userId === user.id ? (
          <IconsContainer
          >
            <RiPencilFill size='25' onClick={handleOpen}></RiPencilFill>
            <FaTrash size='20' onClick={() => onDelete(messageId)}></FaTrash>
          </IconsContainer>
        ) : (
          <></>
        )}
      </MessageContent>
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
          <Form
            onSubmit={(e) => {
              handleClose();
              onEdit(e, messageId, editMessageText);
            }}
          >
            <Input
              width={'80%'}
              value={editMessageText}
              onChange={setEditMessageText}
              placeholder='Message'
            />
            <Button>Send</Button>
          </Form>
        </Box>
      </Modal>
    </MessageContainer>
  );
};

export default Message;
