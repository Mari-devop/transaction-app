import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Button
} from '@chakra-ui/react';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  newStatus: string;
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  newStatus,
  handleStatusChange
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <Select value={newStatus} onChange={handleStatusChange}>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
              <option value='cancelled'>Cancelled</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onUpdate}>
            Update
          </Button>
          <Button variant='ghost' onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTransactionModal;
