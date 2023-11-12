import React from 'react';
import { Button, Modal, Typography, Paper } from '@mui/material';

type ConfirmationModelProps = {
  handleCloseModal: () => void;
  confirmDelete: () => void;
  deleteEmployeeId: string | null;
  headerText: string;
  desText: string;
};

const ConfirmationModel: React.FC<ConfirmationModelProps> = ({
  handleCloseModal,
  confirmDelete,
  deleteEmployeeId,
  headerText,
  desText,
}) => {
  return (
    <Modal open={!!deleteEmployeeId} onClose={handleCloseModal}>
      <Paper style={{ padding: '16px', maxWidth: '300px', margin: 'auto', marginTop: '20vh' }}>
        <Typography variant="h6" gutterBottom>
          {headerText} 
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {desText} 
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default ConfirmationModel;
